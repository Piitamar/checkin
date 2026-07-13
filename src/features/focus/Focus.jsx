import { useState, useMemo, useRef, useEffect } from 'react';

export default function Focus() {
  const alarm = useMemo(() => new Audio("alarm.mp3"), []);  
  const DURATIONS = [0.2,1, 10, 15, 20, 30, 45, 60]

  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [selectedMinutes, setSelectedMinutes] = useState(1);

  const timerIdRef = useRef(null);
  const endTimeRef = useRef(null);

  const progress = useMemo(() => {
    const totalSeconds = selectedMinutes * 60;
    if (!totalSeconds) return 0;

    const computed = ((totalSeconds - secondsLeft) / totalSeconds) * 100;
    return Math.max(0, Math.min(100, computed));
  }, [secondsLeft, selectedMinutes]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondleft = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(secondleft).padStart(2, '0')}`;
  }

  useEffect(() => {
    if (!isRunning) return;

    endTimeRef.current = Date.now() + (secondsLeft * 1000);

    timerIdRef.current = setInterval(function () {
      const now = Date.now();
      const timeLeftMs = endTimeRef.current - now; 
      const timeLeftSeconds = Math.ceil(timeLeftMs / 1000);

      if (timeLeftSeconds <= 0) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
        setSecondsLeft(0);
        setIsRunning(false);
        setIsFinished(true);
        setSecondsLeft(timeLeftSeconds);
        window.api.showPopup();
        alarm.play().catch(console.error);
      } else {
        setSecondsLeft(timeLeftSeconds);
      }
    }, 200);

    return () => {
      if (timerIdRef.current) clearInterval(timerIdRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    const initialSeconds = selectedMinutes * 60
    setSecondsLeft(initialSeconds)
    setIsFinished(false)
    setIsRunning(true)
  }

  const handleReset = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    const initialSeconds = selectedMinutes * 60;
    setSecondsLeft(initialSeconds);
    setIsFinished(false);
    setIsRunning(false);
  }

  return (
    <main className="focusPage relative w-screen mx-auto h-113 mt-10 ">
      <div className="sparkleOrbLeft pointer-events-none absolute left-[6%] top-[10%] h-40 w-40 rounded-full bg-[rgba(231,170,179,0.3)] blur-3xl animate-pulse" />
      <div className="sparkleOrbRight pointer-events-none absolute right-[8%] top-[14%] h-56 w-56 rounded-full bg-[rgba(132,161,195,0.18)] blur-3xl animate-pulse [animation-delay:1.2s]" />
      <div className="sparkleOrbBottom pointer-events-none absolute bottom-[6%] left-[42%] h-28 w-28 rounded-full bg-[rgba(255,255,255,0.55)] blur-2xl animate-pulse [animation-delay:2.2s]" />

      <section className="focusLayout relative z-10 h-80 max-w-150 mx-auto grid grid-cols-[minmax(0,0.8fr)_minmax(320px,1.2fr)] gap-6">
        <div className="leftCard focusLeftCard relative overflow-hidden rounded-[30px] p-8">
          <div className="leftCardContent relative flex h-full flex-col justify-center gap-5">
            <h1 className="pageTitle dark:text-lightwhite text-2xl leading-[0.92] text-darkblue">
              Focus timer
            </h1>
            <div className="statusRow flex flex-wrap gap-3 pt-1">
              <span className="block text-[1.15rem] dark:text-lightwhite text-darkblue">
                {selectedMinutes} min :</span>
              <span className="block text-[1.15rem] dark:text-lightwhite text-darkblue">
                {isRunning ? 'Running' : isFinished ? 'Done' : 'Ready'}
              </span>
            </div>
            <button
              type="button"
              className="resetButton dark:text-lightwhite self-start bg-transparent text-sm text-darkblue/70"
              onClick={handleReset}
            >
              Reset session
            </button>
          </div>
        </div>

        <div className="rightCard leftBar relative flex flex-col gap-4 overflow-hidden rounded-[17px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(243,246,255,0.62))] p-5 shadow-[0_22px_60px_rgba(126,132,161,0.16)] backdrop-blur-xl">
          <div className="progressTrack h-2 overflow-hidden rounded-[10px] bg-darkblue/10">
            <div
              className="progressFill h-full rounded-[10px] bg-[linear-gradient(90deg,#ffffff,#f0f2f4_42%,#e7aab3_100%)] shadow-[0_0_20px_rgba(231,170,179,0.4)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="timerWrap flex min-h-[180px] flex-1 flex-col items-center justify-center">
            <p className="timerLabel mb-3 text-[0.76rem] uppercase tracking-[0.12em] text-darkblue/60">
              Remaining
            </p>
            <div className="timerValue font-['Elms_Sans'] text-[clamp(3rem,7vw,5rem)] leading-[0.95] tracking-[0.06em] text-darkblue [text-shadow:0_0_24px_rgba(255,255,255,0.6)]">
              {formatTime(secondsLeft)}
            </div>
          </div>

          <div className="controlsRow flex items-end gap-3">
            <label className="selectWrap flex-1">
              <select
                className="minuteSelect h-13.5 w-full rounded-[10px] border border-white/70 bg-white/80 px-4 text-base text-darkblue outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur disabled:cursor-not-allowed disabled:opacity-60"
                value={selectedMinutes}
                onChange={(e) => {
                  const minutes = Number(e.target.value);
                  setSelectedMinutes(minutes);
                  setSecondsLeft(minutes * 60);
                }}
                disabled={isRunning}
              >
                {DURATIONS.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} min
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="startButton h-[54px] min-w-[136px] rounded-[10px] bg-[linear-gradient(135deg,#f0f2f4,#e7aab3)] px-5 text-[0.98rem] font-extrabold uppercase tracking-[0.08em] text-darkblue shadow-[0_16px_28px_rgba(126,132,161,0.18)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleStart}
              disabled={isRunning}
            >
              {isRunning ? 'Running' : 'Start'}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
