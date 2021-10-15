/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';

export const useOnEnter = (
  callback: (event: unknown) => void,
  inputs: ReadonlyArray<unknown>
) =>
  useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      callback(event);
    }
  }, inputs);

export default useOnEnter;
