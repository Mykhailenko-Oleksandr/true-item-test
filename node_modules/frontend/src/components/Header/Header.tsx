import clsx from "clsx";
import css from "./Header.module.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={clsx("container", css.headerContainer)}>
        <div className={css.logoWrap}>
          <Link to="/" aria-label="Home" className={css.logo}>
            <svg width={32} height={32}>
              <use href="/icons.svg#ukraine"></use>
            </svg>
          </Link>
        </div>

        <Navigation />
      </div>
    </header>
  );
}
