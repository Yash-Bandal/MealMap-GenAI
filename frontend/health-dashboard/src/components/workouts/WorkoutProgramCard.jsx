import { Clock, Flame, Target } from "lucide-react";

export default function WorkoutProgramCard({ program, selected, onSelect, onStart }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(program)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(program);
      }}
      className={`group cursor-pointer select-none rounded-3xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
        selected
          ? "border-[#FF5E57]/30 bg-[#FF5E57]/10 dark:border-[#FF5E57]/30 dark:bg-[#FF5E57]/15"
          : "border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
            {program.level} | {program.focus}
          </p>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-gray-900 dark:text-white">
            {program.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {program.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          {program.durationMinutes} min
        </span>
        <span className="inline-flex items-center gap-2">
          <Flame className="h-4 w-4 text-gray-400" />
          {program.estCalories} cal
        </span>
        <span className="inline-flex items-center gap-2">
          <Target className="h-4 w-4 text-gray-400" />
          {program.exercises.length} moves
        </span>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStart(program);
          }}
          className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#FF5E57]/30 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Start session
        </button>
      </div>
    </div>
  );
}

