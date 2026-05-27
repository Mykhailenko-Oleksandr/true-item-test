import css from "./Navigation.module.css";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li className={css.item}>
          <Link
            to="/"
            className={clsx(
              css.link,
              location.pathname === "/" && css.currentPage,
            )}
          >
            Home
          </Link>
        </li>
        <li className={css.item}>
          <Link
            to="/tasks"
            className={clsx(
              css.link,
              location.pathname === "/tasks" && css.currentPage,
            )}
          >
            Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
}
