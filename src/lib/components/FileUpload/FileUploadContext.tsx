import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  RefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { CALL_STATE, useApi } from "../../api";

export type UploadedFileResponse = {
  files: UploadedFile[];
};

export type UploadedFile = {
  name: string;
  size: number;
};

export type FileUploadContext = {
  onFilesSelection: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles?: UploadedFile[];
  uploadedFilesError?: Error;
  uploadedFilesCallStatus?: CALL_STATE;
  uploadFilesCallStatus?: CALL_STATE;
  uploadFilesError?: Error;
  inputFileRef?: RefObject<HTMLInputElement>;
  multiple?: boolean;
};

const Context = createContext<FileUploadContext | undefined>(undefined);

export type FileUploadProviderProps = {
  uploadFilesApiUrl: string;
  uploadedFilesListApiUrl: string;
  inputFileRef?: RefObject<HTMLInputElement>;
  multiple?: boolean;
  onUploadSuccess?: () => void;
  onUploadError?: (error: Error) => void;
};

export const FileUploadProvider: FC<
  PropsWithChildren<FileUploadProviderProps>
> = ({
  children,
  uploadFilesApiUrl,
  uploadedFilesListApiUrl,
  onUploadSuccess,
  onUploadError,
  inputFileRef,
  multiple = false,
}) => {
  const { callApi, callStatus, error } = useApi<{ message: string }>(
    uploadFilesApiUrl
  );
  const {
    callApi: filesListCallApi,
    data: uploadedFilesResponse,
    callStatus: uploadedFilesCallStatus,
    error: uploadedFilesError,
  } = useApi<UploadedFileResponse>(uploadedFilesListApiUrl);

  const onFilesSelection = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (!files) return;

      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file, file.name);
      });

      await callApi({ method: "POST", body: formData });

      if (callStatus === "SUCCESSFUL") {
        onUploadSuccess?.();
      }

      if (callStatus === "FAILED" && error) {
        onUploadError?.(error);
      }
    },
    [callApi, callStatus, error, onUploadError, onUploadSuccess]
  );

  useEffect(() => {
    filesListCallApi();
  }, []);

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          onFilesSelection,
          inputFileRef,
          multiple,
          uploadedFiles: uploadedFilesResponse?.files,
          uploadedFilesCallStatus,
          uploadedFilesError,
          uploadFilesCallStatus: callStatus,
          uploadFilesError: error,
        }),
        [
          onFilesSelection,
          inputFileRef,
          multiple,
          uploadedFilesResponse?.files,
          uploadedFilesCallStatus,
          uploadedFilesError,
          callStatus,
          error,
        ]
      )}
    >
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useFileUploadContext(): FileUploadContext {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      "useFileUploadContext must be used within FileUploadProvider"
    );
  }

  return context;
}
