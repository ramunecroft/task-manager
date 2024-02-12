import {db} from "@/server";
import {migrate} from "drizzle-orm/postgres-js/migrator";
const main = async () => {
  try {
    await migrate(db, {migrationsFolder: "drizzle"});
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
await main();
