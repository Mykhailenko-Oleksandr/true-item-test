import { useState } from "react";
import css from "./Tasks.module.css";
import { clsx } from "clsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchTasks } from "../../lib/api";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import TasksList from "../../components/TasksList/TasksList";
import FormTask from "../../components/FormTask/FormTask";

export default function Tasks() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [isCreateModal, setIsCreateModal] = useState(false);

  const { data, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["tasks", topic, page, tag],
    queryFn: () => fetchTasks(topic, page, 12, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  const updateSearchWord = useDebouncedCallback((searchWord: string) => {
    setTopic(searchWord);
    setPage(1);
  }, 500);

  if (isLoading) return <Loader />;

  return (
    <section className={css.section}>
      <div className={clsx("container", css.container)}>
        <Sidebar onChange={(tag) => setTag(tag)} />
        <div className={css.contentWrap}>
          <div className={css.topBox}>
            <SearchBox onChange={updateSearchWord} />
            {isSuccess && totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                page={page}
                updatePage={setPage}
              />
            )}
            <button
              type="button"
              className={css.createBtn}
              onClick={() => setIsCreateModal(true)}
            >
              Create task
            </button>
          </div>

          {isError && <p>There was an error, please try again...</p>}

          {data !== undefined && data?.tasks.length === 0 && (
            <p className={css.noTasks}>No tasks found</p>
          )}

          {data !== undefined && data?.tasks.length > 0 && (
            <TasksList tasks={data?.tasks} />
          )}
        </div>

        {isCreateModal && (
          <Modal onClose={() => setIsCreateModal(false)}>
            <h2 className={css.modalTitle}>Create task</h2>
            <FormTask closeModal={() => setIsCreateModal(false)} />
          </Modal>
        )}
      </div>
    </section>
  );
}
