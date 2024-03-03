import { FC } from "react";
import { FileInput } from "./FileInput";
import { useFileUploadContext } from "./FileUploadContext";
import { FileUploadList } from "./FileUploadList";
import { Loader } from "..";

export const FileUpload: FC = () => {
  const { inputFileRef, onFilesSelection, multiple, uploadFilesCallStatus, uploadFilesError } = useFileUploadContext();

  if (uploadFilesCallStatus === 'FAILED') {
    return (
      <p role="alert" aria-atomic="true">
        {uploadFilesError?.message}
      </p>
    );
  }

  return (
    <>
      <FileInput
        ref={inputFileRef}
        onChange={(event) => onFilesSelection(event)}
        multiple={multiple}
      />
      {uploadFilesCallStatus === "LOADING" && (
        <Loader type="progressbar" ariaLabel="Uploading files" />
      )}
      <FileUploadList />
    </>
  );
};