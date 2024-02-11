import {type TaskType} from "@/app/config/docs";
import {db} from "@/server/db";
import {NextResponse} from "next/server";

type TaskRequestType = {
  ticketCode: string;
  status: TaskType["status"];
};

export async function GET() {
  console.log(1);
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}

export async function POST(request: Request) {
  let updateTask: TaskRequestType;
  try {
    updateTask = (await request.json()) as TaskRequestType;
    if (!updateTask.ticketCode || !updateTask.status) {
      return NextResponse.json({message: "Invalid request data"}, {status: 400});
    }
  } catch (error) {
    return NextResponse.json({message: "Bad request"}, {status: 400});
  }

  try {
    const result = await db.task.update({
      where: {
        ticketCode: updateTask.ticketCode,
      },
      data: {
        status: updateTask.status,
      },
    });
    return NextResponse.json({message: "Task updated successfully", task: result});
  } catch (error) {
    return NextResponse.json({message: "Internal Server Error"}, {status: 500});
  }
}
