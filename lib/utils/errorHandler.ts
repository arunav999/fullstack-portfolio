import { NextResponse } from "next/server";

export function handleApiError(error: unknown, customMessage: string) {
  if (error instanceof Error) {
    return NextResponse.json(
      { message: customMessage, error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "An unknown error occured" },
    { status: 500 },
  );
}
