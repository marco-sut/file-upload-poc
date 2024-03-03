import { ChangeEvent, forwardRef, useId } from "react";
import { CALL_STATE } from "../../api";
import classes from './FileInput.module.css';

export type FileUploadProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadStatus?: CALL_STATE;
  multiple?: boolean;
};

export const FileInput = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ onChange, multiple, uploadStatus = "INITIAL" }, ref) => {
    const id = useId();
    const inputId = `file-${id}`;

    return (
      <>
        <input
          id={inputId}
          ref={ref}
          className={`${classes.inputfile} sr-only`}
          aria-invalid={uploadStatus === "FAILED"}
          type="file"
          multiple={multiple}
          onChange={onChange}
        />
        <label htmlFor={inputId}>Choose a file</label>
      </>
    );
  }
);
