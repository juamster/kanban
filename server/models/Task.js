import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, rel: "Board", required: true },
    list: { type: Schema.Types.ObjectId, rel: "List", required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

TaskSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});