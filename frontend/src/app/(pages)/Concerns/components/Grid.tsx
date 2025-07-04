'use client';

import React from 'react';

interface GridItem {
  id: number | string;
  image: string;
  name: string;
  position?: string;
  location?: string;
  href?: string;
  description?: string;
}

const gridItems: GridItem[] = [
  {
    id: 1,
    image: '/placeholder.png',
    name: 'Allotment Concerns (Tengah)',
    location: 'Tengah',
    description: 'Citizens feel that the current allotment system implemented is unfair.',
    href: 'Concerns/Tengah',
  },
  {
    id: 2,
    image: '/placeholder.png',
    name: 'Allotment Concerns (Jurong East)',
    location: 'Jurong East',
    description: 'Citizens feel that the current allotment system implemented is unfair.',
    href: 'Concerns/Jurong%20East',
  }
];

const Grid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gridItems.map((item) => (
        <a href={item.href ?? '#'} key={item.id}>
          <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full h-32 bg-blue-400 flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/300x150/A7C7E7/FFFFFF?text=Image+Error";
                }}
              />
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-0.5">{item.name}</h3>
              {item.position && <p className="text-gray-600 text-xs mb-0.5">{item.position}</p>}
              {item.location && (
                <p className="text-gray-500 text-xs flex items-center mb-2">
                  <svg
                    className="w-3 h-3 mr-1 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.727A8 8 0 0120 10c0-4.418-3.582-8-8-8S4 5.582 4 10c0 2.21.895 4.21 2.343 5.657L12 22l5.657-5.273z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 9a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item.location}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-gray-500">{item.description}</p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Grid;
