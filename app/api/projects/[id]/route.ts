import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { handleApiError } from "@/lib/utils/errorHandler";

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
    return handleApiError(error, "Failed to get project");
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

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProject)
      return NextResponse.json(
        { message: `Project id: ${id} does not exist.` },
        { status: 404 },
      );

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return handleApiError(error, "Failed to update the project");
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
    return handleApiError(error, "Failed to delete the project");
  }
}
