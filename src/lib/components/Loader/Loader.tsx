import { FC } from "react";
import classes from './Loader.module.css';

type LoaderProps = {
  type: 'progressbar' | 'spinner';
  ariaLabel: string;
};

export const Loader: FC<LoaderProps> = ({ type, ariaLabel }) => {
  return (
    <div className={classes[type]}>
      <div className={classes.inner}>
        <div className={classes.progressBar2} role="presentation"></div>
        <progress
          role="progressbar"
          tabIndex={0}
          aria-label={ariaLabel}
          className="sr-only"
        />
      </div>
    </div>
  );
};
