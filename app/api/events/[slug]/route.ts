import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLocaleLowerCase();

    const event: IEvent | null = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with slug ${sanitizedSlug} not found`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed.", error: e },
      { status: 500 }
    );
  }
}
