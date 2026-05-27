import css from "./Loader.module.css";

type Props = {
  size?: number;
  backdrop?: boolean;
};

export default function Loader({ size = 72, backdrop = true }: Props) {
  return (
    <div
      className={backdrop ? css.backdrop : css.wrapper}
      style={{ "--size": `${size}px` } as React.CSSProperties}
    >
      <div className={css.spinner}>
        <span className={css.outer} />
        <span className={css.inner} />
      </div>
    </div>
  );
}
