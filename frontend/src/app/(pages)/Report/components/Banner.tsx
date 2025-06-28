'use client';
import React from 'react';
import { FaClock } from 'react-icons/fa';

const Banner: React.FC = () => {
  return (
    <div className="text-white py-20 px-4 bg-[#293044]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl mb-4">Share Your Concerns</h1>
        <div className="flex items-center justify-center gap-2 text-white">
          <FaClock className="w-4 h-4" />
          <span className="text-base">3 mins estimated time to complete</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
