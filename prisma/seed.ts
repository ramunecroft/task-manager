import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        ticketCode: "T1",
        title: "Create a new task",
        status: "TO_DO",
        userId: 1,
        description: "Create a new task for the project",
      },
      {
        ticketCode: "T2",
        title: "Update the task",
        status: "IN_PROGRESS",
        userId: 1,
        description: "Update the task for the project",
      },
      {
        ticketCode: "T3",
        title: "Review the task",
        status: "IN_REVIEW",
        userId: 1,
        description: "Review the task for the project",
      },
      {
        ticketCode: "T4",
        title: "Complete the task",
        status: "DONE",
        userId: 1,
        description: "Complete the task for the project",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
