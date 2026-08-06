-- CreateTable
CREATE TABLE "student_scores" (
    "sbd" TEXT NOT NULL,
    "toan" DOUBLE PRECISION,
    "ngu_van" DOUBLE PRECISION,
    "ngoai_ngu" DOUBLE PRECISION,
    "vat_li" DOUBLE PRECISION,
    "hoa_hoc" DOUBLE PRECISION,
    "sinh_hoc" DOUBLE PRECISION,
    "lich_su" DOUBLE PRECISION,
    "dia_li" DOUBLE PRECISION,
    "gdcd" DOUBLE PRECISION,
    "ma_ngoai_ngu" TEXT,

    CONSTRAINT "student_scores_pkey" PRIMARY KEY ("sbd")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_scores_sbd_key" ON "student_scores"("sbd");
