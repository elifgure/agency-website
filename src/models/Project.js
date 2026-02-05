import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  cover: { type: String, required: true },
  video: { type: String },
  reels: [{ type: String }],
  desc: { type: String, required: true },
  client: { type: String },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
