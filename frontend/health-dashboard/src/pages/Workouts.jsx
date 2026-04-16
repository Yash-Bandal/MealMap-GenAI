// import { useState } from "react";
// import { Dumbbell, Target, ChevronDown, ChevronUp } from "lucide-react";

// import WorkoutProgramCard from "../components/workouts/WorkoutProgramCard";
// import IntervalTimer from "../components/workouts/IntervalTimer";
// import CustomTimerCard from "../components/workouts/CustomTimerCard";

// const WORKOUTS = [
//   {
//     id: 1,
//     title: "Full Body Strength",
//     level: "Beginner",
//     focus: "Strength",
//     durationMinutes: 30,
//     estCalories: 320,
//     description: "Build overall strength with compound movements.",
//     exercises: ["Squats", "Push-ups", "Lunges", "Plank", "Glute Bridges"],
//   },
//   {
//     id: 2,
//     title: "Fat Burn HIIT",
//     level: "Intermediate",
//     focus: "Cardio",
//     durationMinutes: 22,
//     estCalories: 380,
//     description: "High-intensity intervals to maximize fat burn.",
//     exercises: ["Burpees", "Jump Squats", "Mountain Climbers", "High Knees"],
//   },
//   {
//     id: 3,
//     title: "Yoga Flow",
//     level: "Beginner",
//     focus: "Mobility",
//     durationMinutes: 25,
//     estCalories: 180,
//     description: "Improve flexibility and recovery.",
//     exercises: ["Sun Salutation", "Warrior II", "Downward Dog"],
//   },
//   {
//     id: 4,
//     title: "Core Crusher",
//     level: "Intermediate",
//     focus: "Core",
//     durationMinutes: 18,
//     estCalories: 260,
//     description: "Build a strong core.",
//     exercises: ["Crunches", "Leg Raises", "Plank"],
//   },
//   {
//     id: 5,
//     title: "Lower Body Power",
//     level: "Advanced",
//     focus: "Strength",
//     durationMinutes: 35,
//     estCalories: 420,
//     description: "Target legs and glutes.",
//     exercises: ["Squats", "Deadlifts", "Lunges"],
//   },
// ];

// const INITIAL_COUNT = 4;

// const Workouts = () => {
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [filter, setFilter] = useState("All");
//   const [showAll, setShowAll] = useState(false);
//   const [timerKey, setTimerKey] = useState(0);
//   const [customConfig, setCustomConfig] = useState(null);
//   const handleCustomStart = ({ work, rest, rounds }) => {
//     setSelectedWorkout(null);
//     setCustomConfig({ work, rest, rounds });
//     setTimerKey((prev) => prev + 1);
//   };

//   const filtered = WORKOUTS.filter(
//     (w) => filter === "All" || w.level === filter
//   );

//   const visibleWorkouts = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

//   const handleStartWorkout = (workout) => {
//     setSelectedWorkout(workout);
//     setTimerKey((prev) => prev + 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
//       <div className="max-w-7xl mx-auto px-6 space-y-10">

//         {/* Header */}
//         <div className="flex items-end justify-between">
//           <div>
//             <div className="flex items-center gap-3">
//               <Dumbbell className="h-8 w-8 text-[#FF5E57]" />
//               <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
//                 Workout Studio
//               </h1>
//             </div>
//             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//               Choose a structured workout and start your session.
//             </p>
//           </div>

//           {/* Filters */}
//           <div className="flex gap-2">
//             {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
//               <button
//                 key={lvl}
//                 onClick={() => setFilter(lvl)}
//                 className={`px-4 py-2 rounded-xl text-sm transition
//                   ${filter === lvl
//                     ? "bg-gray-900 text-white dark:bg-white dark:text-black"
//                     : "bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300"
//                   }`}
//               >
//                 {lvl}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

//           {/* LEFT */}
//           <div className="xl:col-span-7 space-y-6">

//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Programs
//               </h2>

//               {/* View More */}
//               {filtered.length > INITIAL_COUNT && (
//                 <button
//                   onClick={() => setShowAll(!showAll)}
//                   className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
//                 >
//                   {showAll ? "Show Less" : "View More"}
//                   {showAll ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )}
//                 </button>
//               )}
//             </div>

//             {/* Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               {visibleWorkouts.map((workout) => (
//                 <WorkoutProgramCard
//                   key={workout.id}
//                   program={workout}
//                   selected={selectedWorkout?.id === workout.id}
//                   onSelect={setSelectedWorkout}
//                   onStart={handleStartWorkout}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="xl:col-span-5 space-y-6">

//             {/* Details */}
//             <div className="rounded-3xl border border-black/5 bg-white/70 p-6 dark:border-white/10 dark:bg-black/30">
//               {selectedWorkout ? (
//                 <>
//                   <h3 className="text-xl font-semibold">
//                     {selectedWorkout.title}
//                   </h3>

//                   <p className="text-sm text-gray-500 mt-1">
//                     {selectedWorkout.level} • {selectedWorkout.focus}
//                   </p>

//                   <div className="mt-5 space-y-2">
//                     {selectedWorkout.exercises.map((ex, i) => (
//                       <div key={i} className="text-sm text-gray-700 dark:text-gray-300">
//                         • {ex}
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => handleStartWorkout(selectedWorkout)}
//                     className="mt-6 w-full rounded-xl bg-[#FF5E57] text-white py-3 text-sm font-semibold"
//                   >
//                     Start Workout
//                   </button>
//                 </>
//               ) : (
//                 <div className="text-center text-sm text-gray-500 py-20">
//                   Select a workout
//                 </div>
//               )}
//             </div>

//             {/* Timer */}

//             {/* Custom Timer */}
//             <CustomTimerCard onStart={handleCustomStart} />

//             {/* Interval Timer */}
//             {(selectedWorkout || customConfig) && (
//               <IntervalTimer
//                 workSeconds={customConfig?.work || 45}
//                 restSeconds={customConfig?.rest || 15}
//                 rounds={customConfig?.rounds || 6}
//                 startKey={timerKey}
//               />
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Workouts;

import React from 'react'

const Workouts = () => {
  return (
    <div>
      
    </div>
  )
}

export default Workouts
