"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);

  // for removing hydration error
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (e) {
      console.log("Error loading localstorage state", e);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  //storing the state value in local db
  useEffect(() => {
    if (storedValue !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (e) {
        console.log("Error while saving state to local db", e);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
