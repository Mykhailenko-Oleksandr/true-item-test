import css from "./FormTask.module.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tag } from "../../types/tag";
import type { Task } from "../../types/task";
import { createTask, updateTask, type TasksFormData } from "../../lib/api";
import type { ApiError } from "../../types/apiError";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

const tags: Tag[] = [
  "Frontend",
  "Backend",
  "Meeting",
  "Legal",
  "DevOps",
  "Designer",
  "Fullstack",
];

const safeTextRegex = /^[a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s.,!?()''""--]+$/;
const FORBIDDEN_CHARS_REGEX = /[^a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s.,!?()''""--]/g;

const schema = yup
  .object({
    title: yup
      .string()
      .min(1, "Title must be at least 1 character")
      .max(50, "Title must be at most 50 characters")
      .required("Title is required")
      .matches(safeTextRegex, "Title contains forbidden special characters!"),
    content: yup
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(100, "Content must be at most 100 characters")
      .required("Content is required")
      .matches(safeTextRegex, "Content contains forbidden special characters!"),
    tag: yup
      .array()
      .of(yup.string().oneOf(tags).defined())
      .min(1, "Select at least one tag")
      .required("Tag is required"),
  })
  .required();

interface Props {
  update?: boolean;
  task?: Task;
  closeModal: () => void;
}

export default function FormTask({ closeModal, update, task }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log("task in form", task);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TasksFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      title: task?.title || "",
      content: task?.content || "",
      tag: task?.tag || [],
    },
  });

  const handleInputFilter = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.currentTarget;
    target.value = target.value.replace(FORBIDDEN_CHARS_REGEX, "");
  };

  const createTaskMutate = useMutation({
    mutationFn: (data: TasksFormData) => createTask(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const updateTaskMutate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TasksFormData }) =>
      updateTask(id, data),
    onSuccess(data, variables) {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<TasksFormData> = async (data) => {
    try {
      if (task) {
        await updateTaskMutate.mutateAsync({ id: task._id, data });
      } else {
        await createTaskMutate.mutateAsync(data);
      }
      closeModal();
      navigate("/tasks");
      toast.success(update ? "Updated task" : "Created task");
    } catch (error: unknown) {
      const err = error as ApiError;

      toast.error(
        err.response?.data?.response?.validation?.body?.message ||
          err.response?.data?.response?.message ||
          err.message,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.inputBox}>
        <input
          type="text"
          placeholder="Enter title"
          className={css.input}
          {...register("title")}
          onInput={handleInputFilter}
        />

        {errors.title?.message && (
          <span className={css.errorText}>{errors.title?.message}</span>
        )}
      </div>

      <div className={clsx(css.inputBox, css.textareaBox)}>
        <textarea
          rows={5}
          placeholder="Enter content"
          className={css.input}
          {...register("content")}
          onInput={handleInputFilter}
        />

        {errors.content?.message && (
          <span className={css.errorText}>{errors.content?.message}</span>
        )}
      </div>

      <p className={css.subtitle}>
        Tags: <span>(Select at least one tag)</span>
      </p>
      <div className={clsx(css.checkboxBox, css.inputBox)}>
        {tags.map((tag) => {
          return (
            <label key={tag}>
              <input type="checkbox" value={tag} {...register("tag")} />
              {tag}
            </label>
          );
        })}

        {errors.tag?.message && (
          <span className={css.errorText}>{errors.tag?.message}</span>
        )}
      </div>

      <button className={css.submitBtn} type="submit" disabled={!isValid}>
        {update ? "Update task" : "Create task"}
      </button>
    </form>
  );
}
