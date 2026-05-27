import css from "./Sidebar.module.css";

const tags = [
  "Frontend",
  "Backend",
  "Meeting",
  "Legal",
  "DevOps",
  "Designer",
  "Fullstack",
];

interface Props {
  onChange: (tag: string) => void;
}

export default function Sidebar({ onChange }: Props) {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <button
            type="button"
            className={css.menuBtn}
            onClick={() => onChange("All")}
          >
            All
          </button>
        </li>
        {tags.map((tag) => {
          return (
            <li className={css.menuItem} key={tag}>
              <button
                type="button"
                className={css.menuBtn}
                onClick={() => onChange(tag)}
                key={tag}
              >
                {tag}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
