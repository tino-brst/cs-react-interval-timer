import React from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    if (delay !== null) {
      const intervalId = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};
