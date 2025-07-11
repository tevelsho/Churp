'use client';

import React, { ChangeEvent }  from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

interface HeaderProps {
  onSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps>= ({ onSearch }) => {
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // ✅ Call back to parent
  };
  return (
    <div className="text-center py-6 mt-12 lg:mt-0 lg:py-20">
      <h1 className="text-4xl font-bold text-[#293044] mb-4">Explore Community Gardens 🌴</h1>
      <h2 className="text-sm text-[#445072] mb-8">
        Discover and explore public concerns submitted in community gardens across the island!
      </h2>

      <div className="max-w-2xl mx-auto relative">
        <HiMiniMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search different gardens..."
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
        />
      </div>
    </div>
  );
};

export default Header;
