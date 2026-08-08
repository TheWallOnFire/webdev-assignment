import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { SubjectFactory } from '../../common/domain/subjects';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, `../../../${envFile}`) });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Starting data seed...');
    
    const csvPath = path.join(process.cwd(), '..', '..', 'dataset', 'diem_thi_thpt_2024.csv');
    
    if (!fs.existsSync(csvPath)) {
        console.error(`CSV file not found at ${csvPath}`);
        process.exit(1);
    }
    
    const fileStream = fs.createReadStream(csvPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    
    let isFirstLine = true;
    let batch: Prisma.StudentScoreCreateManyInput[] = [];
    const BATCH_SIZE = 5000;
    
    let totalInserted = 0;

    let headers: string[] = [];

    for await (const line of rl) {
        const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());

        if (isFirstLine) {
            headers = columns.map(h => h.toLowerCase());
            isFirstLine = false;
            continue;
        }
        
        const getValue = (colName: string) => {
            const index = headers.indexOf(colName);
            return index !== -1 ? columns[index] : undefined;
        };

        const parseScore = (val?: string) => (val && val.trim() !== '') ? parseFloat(val) : null;
        
        const sbd = getValue('sbd');
        if (sbd && sbd.trim() !== '') {
            const studentData: any = {
                sbd: sbd.trim(),
                ma_ngoai_ngu: getValue('ma_ngoai_ngu')?.trim() || null,
            };

            const subjects = SubjectFactory.getAllSubjects();
            for (const subject of subjects) {
                studentData[subject.code] = parseScore(getValue(subject.code));
            }

            batch.push(studentData as Prisma.StudentScoreCreateManyInput);
        }
        
        if (batch.length >= BATCH_SIZE) {
            try {
                await prisma.studentScore.createMany({
                    data: batch,
                    skipDuplicates: true,
                });
                totalInserted += batch.length;
                console.log(`Inserted ${totalInserted} records...`);
            } catch (err) {
                console.error(`Batch insert failed at ${totalInserted} records.`, err);
            }
            batch = [];
        }
    }
    
    if (batch.length > 0) {
        try {
            await prisma.studentScore.createMany({
                data: batch,
                skipDuplicates: true,
            });
            totalInserted += batch.length;
            console.log(`Inserted ${totalInserted} records...`);
        } catch (err) {
            console.error('Final batch insert failed.', err);
        }
    }
    
    console.log('Data seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
