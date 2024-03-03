import { useState, ChangeEvent, useEffect, useId, useRef, FC } from "react"

export type FileUploadProps = {
  url: string
  onSuccess?: (data: unknown) => void
  onError?: (error: Error) => void
}

export const FileUpload: FC<FileUploadProps> = (props: FileUploadProps) => {
  const { url, onSuccess, onError } = props

  const [isLoading, setisLoading] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [error, setError] = useState("")
  const id = useId()
  const element = useRef<unknown | null>(null)
  const [files, setFiles] = useState<FileList | undefined>()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      /** Reset `error` so `aria-invalid` is not `true` when a new file is selected, provided it was in error */
      setError("")
    }

    if (event.target.files) {
      /** Access `event.target.files` at 0 index because only a single file can be selected */
      setFiles(event.target.files)
    }
  }

  const abortController = new AbortController()

  const onUpload = async () => {
    if (!files) return

    /** `document.activeElement` value will be the upload button if the user used keyboard to trigger the upload */
    element.current = document.activeElement
    setisLoading(true)
    setisSuccess(false)

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('files', file, file.name);
    });
    
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        signal: abortController.signal,
      })

      if (!response.ok) {
        throw new Error("upload failed")
      }

      const data = await response.json()

      setisSuccess(true)
      onSuccess && onSuccess(data)
    } catch (error) {
      if (error instanceof Error) {
        onError && onError(error)

        setError(error.message)
      }
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      /** Restore focus to the upload button after the upload finishes processing, provided the button was focused before the upload */
      if (element.current instanceof HTMLButtonElement) {
        element.current.focus()
      }
    }
  }, [isLoading])

  useEffect(() => () => abortController.abort(), [])

  return (
    <div>
      <input
        aria-label="choose a file to upload"
        aria-describedby={`file-info-${id}`}
        aria-invalid={Boolean(error)}
        aria-errormessage={`error-info-${id}`}
        type="file"
        multiple
        onChange={onChange}
      />

      {/* <p id={`file-info-${id}`}>
        {files ? <>currently selected file is: {files.name}</> : <>no file currently selected</>}
      </p> */}

      {error && (
        <p role="alert" id={`error-info-${id}`}>
          {error}
        </p>
      )}

      {isSuccess && <p role="status">successfully uploaded</p>}

      <button
        aria-disabled={isLoading}
        type="button"
        onClick={onUpload}
        disabled={
          /** Removes focus from the button when `true`. The focus is restored via `element.current.focus()` in `useEffect`  */
          isLoading
        }
      >
        {isLoading ? "loading..." : "upload a file"}
      </button>
    </div>
  )
};