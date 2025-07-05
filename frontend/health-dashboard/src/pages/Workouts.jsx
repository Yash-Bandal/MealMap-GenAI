// src/pages/Workouts.jsx
import React from 'react';

const dummyWorkouts = [
  {
    name: 'Full Body Burn',
    target: 'Full Body',
    duration: '30 mins',
    image: 'https://source.unsplash.com/400x300/?workout,fitness',
  },
  {
    name: 'Leg Day Blast',
    target: 'Legs',
    duration: '45 mins',
    image: 'https://source.unsplash.com/400x300/?legs,exercise',
  },
  {
    name: 'Core Crusher',
    target: 'Abs',
    duration: '20 mins',
    image: 'https://source.unsplash.com/400x300/?abs,workout',
  },
];

const Workouts = () => {
  return (
    <h1 className='text-[50px]  dark:text-white mb-10'>Do Daily</h1>
  );
};

export default Workouts;
