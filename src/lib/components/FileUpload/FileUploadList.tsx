import { FC } from "react";
import { useFileUploadContext } from "./FileUploadContext";
import { Loader } from "..";
import { formatBytes } from "../../utils";

export const FileUploadList: FC = () => {
  const { uploadedFiles, uploadedFilesCallStatus, uploadedFilesError } = useFileUploadContext();

  if (uploadedFilesCallStatus === 'INITIAL') {
    return null;
  }

  if (uploadedFilesCallStatus === 'LOADING') {
    return (
      // here I would've put a Skeleton loader but I'm putting a spinner to save some time
      <div className="flex items-center justify-center mt-6">
        <Loader type="spinner" ariaLabel="Loading uploaded files" />
      </div>
    );
  }

  if (uploadedFilesCallStatus === 'FAILED') {
    return (
      <p role="alert" aria-atomic="true">
        {uploadedFilesError?.message}
      </p>
    );
  }

  return (
    <section>
      <h3 className="my-6">Uploaded files ({uploadedFiles?.length})</h3>
      {/* Here would be better to use a role=grid creating a proper accessible data grid */}
      <ul>
        {uploadedFiles?.length && uploadedFiles.map((file) => (
          <li className="grid grid-cols-3 p-4 border mb-4 rounded-lg shadow-sm sm:text-xl" key={file.name}>
            <span className="col-span-2" aria-describedby="file-name">{file.name}</span>
            <span className="self-center justify-self-end sm:text-base" aria-describedby="file-size">{formatBytes(file.size)}</span>
          </li>
        ))}
      </ul>
      <p className="sr-only" id='file-name'>File name</p>
      <p className="sr-only" id='file-size'>File size</p>
    </section>
  );
};
