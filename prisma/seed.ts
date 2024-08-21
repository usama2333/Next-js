import { PrismaClient } from "@prisma/client";
import { mockUsers } from "../src/utils/server/mock-users"; // Adjust the path as needed
import { Person } from "../src/utils/common/person";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: mockUsers[Person.PersonA] as any,
  });
  await prisma.user.create({
    data: mockUsers[Person.PersonB] as any,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
