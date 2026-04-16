import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

function formatHhMmSs(totalSeconds) {
  const s = Math.max(0, Math.trunc(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function Stopwatch({ startKey = 0 }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!startKey) return;
    setRunning(true);
  }, [startKey]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const label = useMemo(() => formatHhMmSs(seconds), [seconds]);

  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
            Stopwatch
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
            For steady-state cardio or time-on-feet sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            {running ? (
              <span className="inline-flex items-center gap-2">
                <Pause className="h-4 w-4" />
                Pause
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" />
                Start
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {label}
      </div>
    </div>
  );
}

