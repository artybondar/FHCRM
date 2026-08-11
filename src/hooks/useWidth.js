// hooks/useWidth.js
import { useState, useEffect } from "react";

export function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  
  return width;
}