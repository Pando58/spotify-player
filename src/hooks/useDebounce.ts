import { useEffect } from "react";

export function useDebounce(fn: (...args: unknown[]) => void, dependencies: unknown[], delay: number) {
  useEffect(() => {
    const timeout = setTimeout(fn, delay);
    return () => clearTimeout(timeout);
  }, dependencies);
}
