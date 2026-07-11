import { useEffect, useMemo, useState } from 'react'

const DURATIONS = [10, 15, 20, 30, 45, 60]

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function Focus() {
  const [selectedMinutes, setSelectedMinutes] = useState(45)
  const [secondsLeft, setSecondsLeft] = useState(45 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const progress = useMemo(() => {
    const totalSeconds = selectedMinutes * 60
    if (!totalSeconds) return 0
    return Math.max(0, Math.min(100, ((totalSeconds - secondsLeft) / totalSeconds) * 100))
  }, [secondsLeft, selectedMinutes])

  useEffect(() => {
    if (!isRunning) return

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setIsRunning(false)
          setIsFinished(true)
          window.api?.showNotification?.({
            title: 'Focus session finished',
            body: `Your ${selectedMinutes}-minute focus session is done.`,
          })
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [isRunning, selectedMinutes])

  const handleStart = () => {
    const initialSeconds = selectedMinutes * 60
    setSecondsLeft(initialSeconds)
    setIsFinished(false)
    setIsRunning(true)
  }

  const handleReset = () => {
    const initialSeconds = selectedMinutes * 60
    setSecondsLeft(initialSeconds)
    setIsFinished(false)
    setIsRunning(false)
  }

  const handleDurationChange = (event) => {
    const nextMinutes = Number(event.target.value)
    setSelectedMinutes(nextMinutes)
    setSecondsLeft(nextMinutes * 60)
    setIsFinished(false)
    setIsRunning(false)
  }

  return (
    <main className="focusPage relative mx-auto h-113 max-w-150 mt-10 overflow-hidden border-white border rounded-xl px-4 pt-4">
      <div className="sparkleOrbLeft pointer-events-none absolute left-[6%] top-[10%] h-40 w-40 rounded-full bg-[rgba(231,170,179,0.3)] blur-3xl animate-pulse" />
      <div className="sparkleOrbRight pointer-events-none absolute right-[8%] top-[14%] h-56 w-56 rounded-full bg-[rgba(132,161,195,0.18)] blur-3xl animate-pulse [animation-delay:1.2s]" />
      <div className="sparkleOrbBottom pointer-events-none absolute bottom-[6%] left-[42%] h-28 w-28 rounded-full bg-[rgba(255,255,255,0.55)] blur-2xl animate-pulse [animation-delay:2.2s]" />

      <section className="focusLayout relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,0.8fr)_minmax(320px,1.2fr)] gap-6">
        <div className="leftCard focusLeftCard relative min-h-[420px] overflow-hidden rounded-[30px] p-8">
          <div className="leftCardContent relative flex h-full flex-col justify-center gap-5">
            <p className="eyebrow dark:text-lightwhite text-[0.72rem] font-bold uppercase tracking-[0.18em] text-darkblue/70">
              Focus session
            </p>
            <h1 className="pageTitle dark:text-lightwhite text-2xl leading-[0.92] text-darkblue">
              Focus timer
            </h1>
            <div className="statusRow flex flex-wrap gap-3 pt-1">
             <span className="block text-[1.15rem] dark:text-lightwhite text-darkblue">{selectedMinutes} min</span>
             <span className="block text-[1.15rem] dark:text-lightwhite text-darkblue">
                  {isRunning ? 'Running' : isFinished ? 'Done' : 'Ready'}
             </span>
            </div>
          </div>
        </div>

        <div className="rightCard leftBar relative flex min-h-[420px] flex-col gap-4 overflow-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(243,246,255,0.62))] p-5 shadow-[0_22px_60px_rgba(126,132,161,0.16)] backdrop-blur-xl">
          <div className="progressTrack h-2 overflow-hidden rounded-full bg-darkblue/10">
            <div
              className="progressFill h-full rounded-full bg-[linear-gradient(90deg,#ffffff,#f0f2f4_42%,#e7aab3_100%)] shadow-[0_0_20px_rgba(231,170,179,0.4)]"
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
                className="minuteSelect h-[54px] w-full rounded-[16px] border border-white/70 bg-white/80 px-4 text-base text-darkblue outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur disabled:cursor-not-allowed disabled:opacity-60"
                value={selectedMinutes}
                onChange={handleDurationChange}
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
              className="startButton h-[54px] min-w-[136px] rounded-[16px] bg-[linear-gradient(135deg,#f0f2f4,#e7aab3)] px-5 text-[0.98rem] font-extrabold uppercase tracking-[0.08em] text-darkblue shadow-[0_16px_28px_rgba(126,132,161,0.18)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleStart}
              disabled={isRunning}
            >
              {isRunning ? 'Running' : 'Start'}
            </button>
          </div>

          <button
            type="button"
            className="resetButton pl-1 self-start bg-transparent p-0 text-sm text-darkblue/70 transition-transform hover:-translate-y-0.5"
            onClick={handleReset}
          >
            Reset session
          </button>
        </div>
      </section>
    </main>
  )
}
