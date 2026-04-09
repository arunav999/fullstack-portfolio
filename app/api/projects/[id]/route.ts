import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

/* ==================== GET ROUTE ==================== */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const getProject = await Project.findById(id);

    if (!getProject) {
      return NextResponse.json(
        {
          message: "Project not found or dosen't exist",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(getProject, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to get project", error: error?.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({
        message: "An unknown error occured",
      });
    }
  }
}

/* ==================== PATCH ROUTE ==================== */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = await params;
    const { title, description, status, isVisible } = body;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        { message: "Title and description are required for updates" },
        { status: 400 },
      );
    }

    if (!status || isVisible === undefined) {
      return NextResponse.json(
        { message: "Status and visibility are required fields" },
        { status: 400 },
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, status, isVisible },
      { new: true, runValidators: true },
    );

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to update the project", error: error?.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "An unknown error occured" });
    }
  }
}

/* ==================== DELETE ROUTE ==================== */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json(
        {
          message: "Project not found or already deleted",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Project deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to delete project", error: error?.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json({ message: "An unknown error occured" });
    }
  }
}
