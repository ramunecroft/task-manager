import {auth} from "@/auth";
import {db} from "@/server/db";
import {users} from "@/server/db/schema";
import {NextResponse} from "next/server";

export const GET = auth(async () => {
  try {
    const userList = await db.select().from(users);
    return NextResponse.json(userList);
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
});
