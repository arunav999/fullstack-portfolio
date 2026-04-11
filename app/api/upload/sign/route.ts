import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { handleApiError } from "@/lib/utils/errorHandler";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return NextResponse.json({ timestamp, signature }, { status: 200 });
  } catch (e) {
    return handleApiError(e, "Failed to generate Cloudinary Signature");
  }
}
