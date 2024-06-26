import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.list.create({
    data: {
      name: "Weekend Tasks",
      items: {
        create: [
          { description: "Mow the lawn", isComplete: true },
          { description: "Go for a meal", isComplete: false },
        ],
      },
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
