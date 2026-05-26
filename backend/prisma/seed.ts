import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding empresas...');

  await prisma.empresa.upsert({
    where: { name: 'Hostway' },
    update: {},
    create: {
      name: 'Hostway',
    },
  });

  await prisma.empresa.upsert({
    where: { name: 'Tour House' },
    update: {},
    create: {
      name: 'Tour House',
    },
  });

  console.log('Empresas seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
