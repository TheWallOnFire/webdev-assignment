import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, `../../../${envFile}`) });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Starting data seed...');
    
    const csvPath = path.resolve(process.cwd(), '../../dataset/diem_thi_thpt_2024.csv');
    
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
    let batch: any[] = [];
    const BATCH_SIZE = 5000;
    
    let totalInserted = 0;

    for await (const line of rl) {
        if (isFirstLine) {
            isFirstLine = false;
            continue;
        }
        
        const [
            sbd, toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd, ma_ngoai_ngu
        ] = line.split(',');
        
        const parseScore = (val: string) => (val && val.trim() !== '') ? parseFloat(val) : null;
        
        if (sbd && sbd.trim() !== '') {
            batch.push({
                sbd: sbd.trim(),
                toan: parseScore(toan),
                ngu_van: parseScore(ngu_van),
                ngoai_ngu: parseScore(ngoai_ngu),
                vat_li: parseScore(vat_li),
                hoa_hoc: parseScore(hoa_hoc),
                sinh_hoc: parseScore(sinh_hoc),
                lich_su: parseScore(lich_su),
                dia_li: parseScore(dia_li),
                gdcd: parseScore(gdcd),
                ma_ngoai_ngu: ma_ngoai_ngu ? ma_ngoai_ngu.trim() : null,
            });
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
