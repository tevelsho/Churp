'use client';
import React from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Header: React.FC = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-16">
      <div className="max-w-lg relative flex items-center">
        <HiMiniMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search different concerns..."
          className="w-full border border-gray-300 rounded-md py-3 pl-12 pr-4 text-base focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
        />
      </div>
    </div>
  );
};

export default Header;
