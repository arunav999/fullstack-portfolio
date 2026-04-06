import mongoose, { Document, Schema } from "mongoose";

// Creating a typescript interface for the Project Model
export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl?: string;
  liveLink?: string;
  githubLink?: string;
  status: string;
  isVisible: boolean;
}

// Creating Project Schema
const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    liveLink: { type: String, required: false },
    githubLink: { type: String, required: false },
    status: {
      type: String,
      enum: ["draft", "active", "inactive"],
      default: "draft",
      required: true,
    },
    isVisible: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

// Exporting and cheching if not there create new else work with existing
const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
