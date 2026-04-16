import { useState } from "react";

const CustomTimerCard = ({ onStart }) => {
    const [work, setWork] = useState(40);
    const [rest, setRest] = useState(15);
    const [rounds, setRounds] = useState(6);

    return (
        <div className="rounded-3xl border border-black/5 bg-white/70 p-6 space-y-6 dark:border-white/10 dark:bg-black/30">

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Custom Timer
            </h3>

            {/* Inputs */}
            <div className="grid grid-cols-3 gap-4">

                {/* Work */}
                <div>
                    <label className="text-xs text-gray-500">Work</label>
                    <input
                        type="number"
                        value={work}
                        onChange={(e) => setWork(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-black/30"
                    />
                </div>

                {/* Rest */}
                <div>
                    <label className="text-xs text-gray-500">Rest</label>
                    <input
                        type="number"
                        value={rest}
                        onChange={(e) => setRest(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-black/30"
                    />
                </div>

                {/* Rounds */}
                <div>
                    <label className="text-xs text-gray-500">Rounds</label>
                    <input
                        type="number"
                        value={rounds}
                        onChange={(e) => setRounds(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-black/30"
                    />
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={() => onStart({ work, rest, rounds })}
                className="w-full rounded-xl bg-gray-900 text-white py-3 text-sm font-semibold dark:bg-white dark:text-black"
            >
                Start Custom Timer
            </button>
        </div>
    );
};

export default CustomTimerCard;