import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    
    const storedValue = localStorage.getItem(key);
    if(!storedValue)localStorage.setItem(key, JSON.stringify(initialValue));
    
    setValue(storedValue ? JSON.parse(storedValue) : initialValue);
  }, []);

  const setLocalStorage = (value: T) => {
    if (typeof window === 'undefined') return;
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [value, setLocalStorage] as const;
}

export default useLocalStorage;