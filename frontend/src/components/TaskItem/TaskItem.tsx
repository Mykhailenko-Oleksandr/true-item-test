import css from "./TaskItem.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { Task } from "../../types/task";
import { deleteTask } from "../../lib/api";
import { Link } from "react-router-dom";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const queryClient = useQueryClient();

  const deleteTaskMutate = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function handleDeleteTask(id: string) {
    deleteTaskMutate.mutate(id);
  }
  return (
    <li className={css.listItem}>
      <h2 className={css.title}>{task.title}</h2>
      <p className={css.content}>{task.content}</p>
      {task.tag.length > 0 && (
        <ul className={css.listTags}>
          {task.tag.map((oneTag) => {
            return (
              <li className={css.tagItem} key={oneTag}>
                {oneTag}
              </li>
            );
          })}
        </ul>
      )}
      <div className={css.footer}>
        <Link className={css.link} to={`/tasks/${task._id}`}>
          View details
        </Link>

        <button
          onClick={() => handleDeleteTask(task._id)}
          className={css.button}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
