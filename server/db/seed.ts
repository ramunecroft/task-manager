import {db} from "@/server/db";
import {tasks, users} from "@/server/db/schema";

async function main() {
  console.log("seeding database...");

  // const [user] = await db
  //   .insert(users)
  //   .values({
  //     email: "test@gmail.com",
  //     name: "test user",
  //     password: "12341234",
  //     role: "admin",
  //   })
  //   .returning();

  for (let index = 0; index < 10; index++) {
    const task = await db.insert(tasks).values({
      title: "Task title",
      description: "Task description",
      status: "TO_DO",
      ticketCode: "TICKET-" + index,
      priority: "low",
      ownerId: "7f52ec8b-3f25-4b11-bb18-e691dd2d68d5",
    });
  }

  console.log("seeded database");
  process.exit(0);
}

main()
  .then()
  .catch(err => {
    console.log(err);
    process.exit(0);
  });
