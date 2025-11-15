import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;
    let tags = JSON.parse(formData.get("tags") as string);
    let agenda = JSON.parse(formData.get("agenda") as string);

    try {
      event = Object.fromEntries(formData.entries());
      // console.log(event);
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 400 }
      );
    }

    const createdEvent = await Event.create({ ...event, tags, agenda });

    return NextResponse.json(
      {
        message: "Event created successfully!",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Event creation failed.",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Event fetched successfully", events },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed.", error: e },
      { status: 500 }
    );
  }
}
