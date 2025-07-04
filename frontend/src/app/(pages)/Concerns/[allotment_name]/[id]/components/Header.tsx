'use client';
import React from 'react';

const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const concernInfo = "Community Garden Maintenance";

  return (
    <div className="max-w-screen-2xl mx-auto px-16 mb-12 flex items-start justify-between">
      <div className="flex flex-col items-start flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Ongoing Dispute Over Community Garden Plot Boundaries
        </h1>
        <p className="text-gray-600 text-sm flex items-center">
          Required {currentDate}
          <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
            {concernInfo}
          </span>
        </p>
      </div>
      <div className="flex-shrink-0 mt-2 flex-1 text-right">
        <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 text-sm font-medium">
          Solved
        </span>
      </div>
    </div>
  );
};

export default Header;
