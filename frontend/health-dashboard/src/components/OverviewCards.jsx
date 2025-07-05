// src/components/OverviewCards.jsx
import React from 'react';

const cards = [
    {
        title: 'Number of Recipes',
        count: 167,
        description: '(85 not used in any diet)',
        button: 'See all',
        color: 'bg-purple-600',
    },
    {
        title: 'Number of Ingredients',
        count: 548,
        description: '(79 with shared included)',
        button: 'See all',
        color: 'bg-blue-600',
    },
    {
        title: 'Number of Exercises',
        count: 63,
        description: '(Not used in any workout)',
        button: 'See all',
        color: 'bg-green-600',
    },
];

const OverviewCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow p-6"
                >
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {card.title}
                    </h3>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                        {card.count}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {card.description}
                    </p>
                    <button
                        className={`${card.color} text-white px-4 py-1 rounded mt-4 text-sm`}
                    >
                        {card.button}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;
