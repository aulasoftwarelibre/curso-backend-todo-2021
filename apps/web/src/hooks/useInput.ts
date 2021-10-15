import { useCallback, useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState('');

  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return { value, onChange, setValue };
};
