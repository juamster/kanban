import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ListSchema = new Schema(
  {
    name: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, rel: "Board", required: true },
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ListSchema.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});