import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Welcome to my test app</h1>
        <p className={css.description}>
          Here you can add tasks (short entries), view the list, filter by tags
          and search by title/content, open detailed information about the task,
          edit and delete.
        </p>
        <p className={css.description}>
          Click the &quot;Get started&quot; button to begin. There you will find
          a list page with the ability to create a new task through a form, a
          task detail page, options to edit and delete, search and filter by tag
          in the interface, basic form validation, and clean integration with
          the API.
        </p>

        <Link className={css.startLink} to="/tasks">
          Get Started
        </Link>
      </div>
    </section>
  );
}
