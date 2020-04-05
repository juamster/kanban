import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, rel: "Task", required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CommentSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});