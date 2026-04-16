import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

function clampInt(n, min, max) {
  const x = Number.isFinite(n) ? Math.trunc(n) : 0;
  return Math.max(min, Math.min(max, x));
}

function formatMmSs(totalSeconds) {
  const s = Math.max(0, Math.trunc(totalSeconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function IntervalTimer({
  workSeconds = 40,
  restSeconds = 20,
  rounds = 6,
  startKey = 0,
  onComplete,
}) {
  const safeWork = clampInt(workSeconds, 5, 600);
  const safeRest = clampInt(restSeconds, 0, 600);
  const safeRounds = clampInt(rounds, 1, 50);

  const initial = useMemo(
    () => ({
      phase: "work",
      round: 1,
      remaining: safeWork,
      running: false,
    }),
    [safeWork]
  );

  const [phase, setPhase] = useState(initial.phase); // "work" | "rest"
  const [round, setRound] = useState(initial.round);
  const [remaining, setRemaining] = useState(initial.remaining);
  const [running, setRunning] = useState(initial.running);

  // Restart values when config changes.
  useEffect(() => {
    setPhase("work");
    setRound(1);
    setRemaining(safeWork);
    setRunning(false);
  }, [safeWork, safeRest, safeRounds]);

  // Autostart signal (used by parent "Start session" button).
  useEffect(() => {
    if (!startKey) return;
    setRunning(true);
  }, [startKey]);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (remaining > 0) return;

    if (phase === "work") {
      if (safeRest > 0) {
        setPhase("rest");
        setRemaining(safeRest);
        return;
      }
      // No rest configured -> behave like instant rest complete.
      if (round >= safeRounds) {
        setRunning(false);
        onComplete?.();
        return;
      }
      setRound((r) => r + 1);
      setRemaining(safeWork);
      return;
    }

    // phase === "rest"
    if (round >= safeRounds) {
      setRunning(false);
      onComplete?.();
      return;
    }
    setPhase("work");
    setRound((r) => r + 1);
    setRemaining(safeWork);
  }, [onComplete, phase, remaining, round, running, safeRest, safeRounds, safeWork]);

  const totalPhaseSeconds = phase === "work" ? safeWork : safeRest;
  const pct =
    totalPhaseSeconds > 0
      ? Math.max(0, Math.min(100, (remaining / totalPhaseSeconds) * 100))
      : 0;

  const phaseLabel = phase === "work" ? "Work" : "Rest";

  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/30">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
            Interval timer
          </p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
            Round {round} of {safeRounds} | {phaseLabel}
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
              setPhase("work");
              setRound(1);
              setRemaining(safeWork);
              setRunning(false);
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-gray-900 shadow-sm hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:border-white/10 dark:bg-black/20 dark:text-white dark:hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-end justify-between">
          <div className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {formatMmSs(remaining)}
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {phase === "work" ? `${safeWork}s work` : `${safeRest}s rest`}
          </div>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
          <div
            className={`h-full rounded-full transition-[width] duration-300 ${
              phase === "work" ? "bg-[#FF5E57]" : "bg-emerald-500"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
          Tip: keep your pace sustainable for the full set.
        </p>
      </div>
    </div>
  );
}

