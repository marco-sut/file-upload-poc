import { FC } from "react";
import { FileUpload } from "./FileUpload";
// import { FileUploadList } from "./FileUploadList";

export const FileUploadWidget: FC = () => {
  return (
    <div>
      <FileUpload url="/api/upload" />
      {/* <FileUploadList /> */}
    </div>
  );
};