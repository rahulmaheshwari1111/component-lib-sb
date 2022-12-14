import React, { useEffect, useState } from "react";

export interface ICountDown {
  time: number;
  callback?: (name: boolean) => ReturnType<(...args: any) => any>;
  className?: string;
  refresh?: boolean;
}

export const CountDown: React.FC<ICountDown> = ({
  time,
  callback,
  className = "",
  refresh,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(time);
  const [refreshData, setRefreshData] = useState(refresh);

  useEffect(() => {
    if (refresh) {
      setRefreshData(true);
      setSecondsLeft(time);
    }
  }, [refresh]);

  useEffect(() => {
    let timeOut: any;
    if (secondsLeft && secondsLeft > 0 && refreshData) {
      timeOut = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    }
    if (secondsLeft === 0 && refreshData) {
      handleLock();
    }
    return () => clearTimeout(timeOut);
  }, [secondsLeft]);

  const handleLock = () => {
    if (callback) {
      setRefreshData(false);
      callback(true);
    }
  };

  return (
    <div className={className}>
      {!!secondsLeft && secondsLeft < 10 ? (
        <p>{"00:0" + secondsLeft}</p>
      ) : secondsLeft !== 0 ? (
        <p>{"00:" + secondsLeft}</p>
      ) : (
        <p>{"00:00"}</p>
      )}
    </div>
  );
};
