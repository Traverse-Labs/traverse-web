import { useEffect, useState } from "react";

const useMinWidth = (width?: string) => {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    const minWidthQuery = `(min-width: ${width ?? ""})`;

    const media = window.matchMedia(minWidthQuery);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, width]);

  return matches;
};

export default useMinWidth;
