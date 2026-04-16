import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.environments.createMany({
    data: [{ name: "dev" }, { name: "stage" }, { name: "prod" }],
    skipDuplicates: true,
  });

  console.log("Environments seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
