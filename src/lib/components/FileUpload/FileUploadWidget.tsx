import { FC } from "react";
import { FileUploadProvider, FileUploadProviderProps } from "./FileUploadContext";
import { FileUpload } from "./FileUpload";

export type FileUploadWidgetProps = FileUploadProviderProps;

export const FileUploadWidget: FC<FileUploadWidgetProps> = (props) => {
  return (
    <FileUploadProvider {...props}>
      <FileUpload />
    </FileUploadProvider>
  );
};