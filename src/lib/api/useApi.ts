import { useCallback, useState } from "react"

export type CALL_STATE = 'INITIAL' | 'LOADING' | 'SUCCESSFUL' | 'FAILED';

export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [callStatus, setCallStatus] = useState<CALL_STATE>('INITIAL');
  const [error, setError] = useState<Error>();

  const callApi = useCallback(async ({ method, ...rest }: RequestInit = {}) => {
    setCallStatus('LOADING');
    setData(undefined);
    setError(undefined);

    try {
      const response = await fetch(url, {
        method: method ?? 'GET',
        ...rest,
      })

      if (!response.ok) {
        throw new Error("upload failed");
      }

      const data = await response.json()

      setCallStatus('SUCCESSFUL');
      setData(data);
    } catch (error) {
      setCallStatus('FAILED');
      setError(error as Error);
    }
  }, [url]);

  return { callApi, data, callStatus, error };
}