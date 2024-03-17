import {auth} from "@/auth";
import {db} from "@/server/db";
import {insertTaskSchema, tasks, type UpdateTaskInput} from "@/server/db/schema";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";

export const GET = auth(async () => {
  try {
    const taskList = await db.select().from(tasks);
    return NextResponse.json(taskList);
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
});

export async function PUT(request: Request) {
  try {
    const payload = (await request.json()) as UpdateTaskInput;
    const parsed = insertTaskSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({message: "Invalid request data"}, {status: 400});
    }

    const validatedFields = parsed.data;

    const [result] = await db
      .update(tasks)
      .set(validatedFields)
      .where(eq(tasks.ticketCode, validatedFields.ticketCode))
      .returning();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({message: "Task updated failed"}, {status: 500});
  }
}
