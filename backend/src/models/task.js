import { model, Schema } from "mongoose";
import { TAGS } from "../constants/tags.js";

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tag: {
      type: [String],
      enum: TAGS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

tasksSchema.index(
  { title: "text", content: "text" },
  {
    name: "TaskTextIndex",
    weights: { title: 10, content: 5 },
  },
);

tasksSchema.index({ tag: 1 });

export const Task = model("Task", tasksSchema);
