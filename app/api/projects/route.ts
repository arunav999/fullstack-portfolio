import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/utils/errorHandler";

import Project from "@/lib/models/Project";

/* ==================== POST ROUTE ==================== */
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { title, description, status, isVisible } = body;

    // 1. Validate Strings (Using optional chaining ?. to prevent crashes)
    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { message: "Title and description are required fields." },
        { status: 400 }, // Bad Request
      );
    }

    // 2. Validate Enums & Booleans
    if (!status || isVisible === undefined) {
      return NextResponse.json(
        { message: "Status and Visibility are required fields." },
        { status: 400 }, // Bad Request
      );
    }

    // 3. Database Operation
    const newProject = await Project.create(body);

    return NextResponse.json(newProject, { status: 201 }); // Created
  } catch (error) {
    return handleApiError(error, "Failed to create project");
  }
}

/* ==================== GET ROUTE ==================== */
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find({}).sort({ createdAt: -1 });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return handleApiError(error, "Failed to fetch the project");
  }
}
