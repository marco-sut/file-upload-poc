import { FC } from "react";
import { useFileUploadContext } from "./FileUploadContext";
import { Loader } from "..";
import { formatBytes } from "../../utils";

export const FileUploadList: FC = () => {
  const { uploadedFiles, uploadedFilesCallStatus, uploadedFilesError } =
    useFileUploadContext();

  if (uploadedFilesCallStatus === "INITIAL") {
    return null;
  }

  if (uploadedFilesCallStatus === "LOADING") {
    return (
      // here I would've put a Skeleton loader but I'm putting a spinner to save some time
      <div className="flex items-center justify-center mt-6">
        <Loader type="spinner" ariaLabel="Loading uploaded files" />
      </div>
    );
  }

  if (uploadedFilesCallStatus === "FAILED") {
    return (
      <p role="alert" aria-atomic="true">
        {uploadedFilesError?.message}
      </p>
    );
  }

  if (uploadedFiles?.length === 0) {
    return (
      <section>
        <h3 className="my-6">No files uploaded.</h3>
      </section>
    );
  }

  return (
    uploadedFiles?.length && (
      <section>
        <h3 className="my-6">Uploaded files ({uploadedFiles?.length})</h3>
        <ul role="grid">
          {uploadedFiles.map((file) => (
            <li key={file.name} role="row">
              <a
                className="grid grid-cols-3 p-4 border mb-4 rounded-lg shadow-sm sm:text-xl hover:border-black outline-black"
                href={`/uploads/${file.name}`}
                target="blank"
              >
                <span
                  className="col-span-2"
                  role="gridcell"
                  aria-describedby="file-name"
                >
                  {file.name}
                </span>
                <span
                  className="self-center justify-self-end sm:text-base"
                  role="gridcell"
                  aria-describedby="file-size"
                >
                  {formatBytes(file.size)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="sr-only" id="file-name">
          File name
        </p>
        <p className="sr-only" id="file-size">
          File size
        </p>
      </section>
    )
  );
};
