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
      default: "",
      trim: true,
    },
    tag: {
      type: [String],
      enum: TAGS,
      default: ["All"],
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

tasksSchema.index({ tags: 1 });

export const Task = model("Task", tasksSchema);
