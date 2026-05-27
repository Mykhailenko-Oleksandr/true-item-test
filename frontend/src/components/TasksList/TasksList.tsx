import type { Task } from "../../types/task";
import TaskItem from "../TaskItem/TaskItem";
import css from "./TasksList.module.css";

interface Props {
  tasks: Task[];
}

export default function TasksList({ tasks }: Props) {
  return (
    <ul className={css.list}>
      {tasks.map((task) => {
        return <TaskItem task={task} key={task._id} />;
      })}
    </ul>
  );
}
