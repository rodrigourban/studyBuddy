import { useEffect } from "react";
import { formatTime } from "../utils/formatTime";
import { useGlobalContext } from "../hooks/useContext";

function Timer() {
  const { secondsElapsed, timerTick } = useGlobalContext();
  useEffect(
    function () {
      const id = setInterval(function () {
        timerTick();
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [timerTick]
  );

  return (
    <span className="rounded-full border-slate-900 border-2 text-xl p-2">
      {formatTime(secondsElapsed)}
    </span>
  );
}

export default Timer;
