import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";

const safeTextRegex = /^[a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s.,!?()''""--]+$/;

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format") : value;
};

export const taskIdSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getAllTasksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .trim()
      .allow("")
      .pattern(safeTextRegex, "Tag contains invalid characters"),
    q: Joi.string()
      .trim()
      .allow("")
      .pattern(safeTextRegex, "Search query contains invalid characters"),
  }),
};

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string()
      .min(1)
      .max(50)
      .required()
      .pattern(safeTextRegex, "Title contains invalid characters"),
    content: Joi.string()
      .min(10)
      .max(100)
      .required()
      .pattern(safeTextRegex, "Content contains invalid characters"),
    tag: Joi.array()
      .items(Joi.string().valid(...TAGS))
      .min(1),
  }),
};

export const updateTaskSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string()
      .min(1)
      .max(50)
      .required()
      .pattern(safeTextRegex, "Title contains invalid characters"),
    content: Joi.string()
      .min(10)
      .max(100)
      .required()
      .pattern(safeTextRegex, "Content contains invalid characters"),
    tag: Joi.array()
      .items(Joi.string().valid(...TAGS))
      .min(1),
  }),
};
