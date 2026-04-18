import { useState, useRef } from "react";

function Timer() {
  const WORK = 1500;
  const BREAK = 300;

  const [time, setTime] = useState(WORK);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          if (isBreak) {
            setIsBreak(false);
            return WORK;
          } else {
            setIsBreak(true);
            return BREAK;
          }
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsBreak(false);
    setTime(WORK);
  };

  const format = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = isBreak ? 0 : (time / WORK) * 160;

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <h2>{isBreak ? "Break Time" : "Study Time"}</h2>
      <h1>{format()}</h1>

      {/* ROCKET AREA */}
      <div
        style={{
          height: "220px",
          position: "relative",
          margin: "20px 0",
          border: "1px solid cyan",
          borderRadius: "10px",
          overflow: "hidden",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        {/* Planet */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, #7b2ff7, #2c003e)",
            borderRadius: "50%",
            boxShadow: "0 0 25px #7b2ff7",
          }}
        />

        {/* Rocket */}
        <div
          style={{
            position: "absolute",
            bottom: `${progress}px`,
            left: "50%",
            transform: "translateX(-50%)",
            transition: isBreak ? "bottom 0.5s ease-in" : "bottom 1s linear",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            filter: isBreak ? "none" : "drop-shadow(0 0 10px orange)",
          }}
        >
          {/* Body */}
          <div
            style={{
              width: "20px",
              height: "40px",
              background: "white",
              borderRadius: "10px 10px 0 0",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "cyan",
                borderRadius: "50%",
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* Flame */}
          {!isBreak && (
            <div
              style={{
                width: "8px",
                height: "14px",
                background: "orange",
                borderRadius: "50%",
                marginTop: "2px",
                animation: "flame 0.25s infinite alternate",
              }}
            />
          )}
        </div>
      </div>

      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;