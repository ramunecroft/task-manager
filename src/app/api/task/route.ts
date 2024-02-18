import {db} from "@/server";
import {updateTaskStatusSchema, tasks} from "@/server/schema";
import {eq} from "drizzle-orm";
import {NextResponse} from "next/server";

export async function GET() {
  try {
    const taskList = await db.select().from(tasks);
    return NextResponse.json(taskList);
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}

export async function PUT(request: Request) {
  try {
    const payload: unknown = await request.json();
    const parsed = updateTaskStatusSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({message: "Invalid request data"}, {status: 400});
    }

    const {status, ticketCode} = parsed.data;

    const result = await db
      .update(tasks)
      .set({status: status})
      .where(eq(tasks.ticketCode, ticketCode))
      .returning();
    return NextResponse.json({message: "Task updated successfully", task: result});
  } catch (error) {
    return NextResponse.json({message: "Task updated failed"}, {status: 500});
  }
}
