'use client';

import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

interface GridItem {
  id: number | string;
  image: string;
  name: string;
  position?: string;
  location?: string;
  href?: string;
  concernsCount?: number;
}

const gridItems: GridItem[] = [
  {
    id: 1,
    image: '/GardeningBro.svg',
    name: 'Plantation Grove',
    location: 'Blk 120A',
    concernsCount: 10,
    href: 'CommunityDashboard/Plantation Grove',
  },
  {
    id: 2,
    image: '/Seeding.svg',
    name: 'Tengah Community Club',
    location: 'Blk 119C',
    concernsCount: 8,
    href: 'CommunityDashboard/Tengah%20Community Club',
  },
  {
    id: 3,
    image: '/Gardening.svg',
    name: 'Garden Vale',
    location: 'Blk 226',
    concernsCount: 10,
    href: 'CommunityDashboard/Garden Vale',
  },
  {
    id: 4,
    image: '/Blooming.svg',
    name: 'Plantation Acres',
    location: 'Blk 111A',
    concernsCount: 8,
    href: 'CommunityDashboard/Plantation Acres',
  }
];

interface GridProps {
  checkedFilters: Set<string>;
}

const Grid: React.FC<GridProps> = ({ checkedFilters }) => {
   const filteredItems = gridItems.filter(item => {
    if (checkedFilters.size === 0) return true;
    const locationId = item.location?.toLowerCase().replace('blk ', '') ?? '';
    return [...checkedFilters].some(filter => locationId.includes(filter.toLowerCase()));
  });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <a href={item.href ?? '#'} key={item.id}>
          <div className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full h-32 flex items-center justify-center overflow-hidden">
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
              <h3 className="text-lg text-[#293044] mb-0.5">{item.name}</h3>
              {item.position && (
                <p className="text-gray-600 text-xs mb-0.5">{item.position}</p>
              )}
              {item.location && (
                <p className="text-[#445072] text-xs flex items-center mb-1">
                  <FaLocationDot className="mr-1" />
                  {item.location}
                </p>
              )}
              {typeof item.concernsCount === 'number' && (
                <p className="text-sm text-[#445072] mt-4">
                  <span className="font-bold underline">{item.concernsCount}</span> Concerns Submitted
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Grid;
