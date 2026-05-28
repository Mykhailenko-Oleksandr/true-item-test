import { useQuery } from "@tanstack/react-query";
import css from "./TaskDetails.module.css";
import { useState } from "react";
import { fetchTaskById } from "../../lib/api";
import Loader from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import FormTask from "../../components/FormTask/FormTask";

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id!),
    refetchOnMount: false,
  });

  function handleBack() {
    navigate(-1);
  }

  function dateNormalize(date: string) {
    const [year, month, day] = date.split("T")[0].split("-");
    const [hours, minutes] = date.split("T")[1].split(":");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  if (isLoading) return <Loader />;

  if (error || !task) return <p>Something went wrong</p>;

  return (
    <section className={css.section}>
      <div className="container">
        <button className={css.backBtn} onClick={handleBack}>
          Back
        </button>
        <div className={css.contentWrap}>
          <div className={css.item}>
            <div className={css.titleWrap}>
              <h2>{task.title}</h2>
            </div>
            <p className={css.content}>{task.content}</p>

            {task.tag.length > 0 && (
              <ul className={css.tagsList}>
                {task.tag.map((oneTag) => {
                  return (
                    <li className={css.tagItem} key={oneTag}>
                      {oneTag}
                    </li>
                  );
                })}
              </ul>
            )}
            <div className={css.dateWrap}>
              <p className={css.date}>
                Created: <span>{dateNormalize(task.createdAt)}</span>
              </p>
              <p className={css.date}>
                Updated: <span>{dateNormalize(task.updatedAt)}</span>
              </p>
            </div>

            <button
              className={css.updateBtn}
              type="button"
              onClick={() => setIsUpdateModal(true)}
            >
              Update task
            </button>
          </div>
        </div>

        {isUpdateModal && (
          <Modal onClose={() => setIsUpdateModal(false)}>
            <h2 className={css.modalTitle}>Update task</h2>
            <FormTask
              closeModal={() => setIsUpdateModal(false)}
              update
              task={task}
            />
          </Modal>
        )}
      </div>
    </section>
  );
}
