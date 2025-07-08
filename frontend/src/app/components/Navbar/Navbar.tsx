'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState('/Discover');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentPath('/Discover');
  }, []);

  const navItems = [
    { name: 'Community Dashboard', href: '/Concerns' },
    { name: 'Report a Concern', href: '/Report' },
  ];

  return (
    <nav className="bg-white w-full relative z-40">

      {/* 🖥️ DESKTOP VIEW (Original Code Unaffected) */}
      <div className="hidden sm:flex w-full max-w-screen-2xl mx-auto py-3 items-center px-16">
        <div className="flex items-center space-x-8 flex-grow">
          <a
            href="/"
            className="flex-shrink-0"
            onClick={() => setCurrentPath('/')}
          >
            <img src="/churp_w_text.svg" alt="HearUs Logo" width={96} height={96} />
          </a>

          <div className="hidden sm:flex sm:space-x-6">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group px-2 py-1 rounded-md flex-shrink-0"
                  onClick={() => setCurrentPath(item.href)}
                >
                  <span
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#2a56c5]'
                        : 'text-[#A0A4AD] group-hover:text-[#2a56c5]'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className="absolute inset-0 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-20"
                    style={{ backgroundColor: '#2a56c5' }}
                  ></span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center">
          <div className="max-w-xs mx-auto relative">
            <HiMiniMagnifyingGlass
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
            />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md py-2 pl-12 pr-4 text-sm
                        focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log('Search for:', (e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW: Standalone rendering for screen < 640px */}
      <div className="sm:hidden w-full py-3 px-4 flex items-center justify-between">
        {/* 📱 MOBILE: Logo */}
        <a href="/" onClick={() => setCurrentPath('/')}>
          <img src="/churp_w_text.svg" alt="HearUs Logo" width={80} height={80} />
        </a>

        {/* 📱 MOBILE: Search + Hamburger */}
        <div className="flex items-center gap-2">
          <div className="w-[120px] relative">
            <HiMiniMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md py-2 pl-12 pr-4 text-sm focus:outline-none focus:ring-[#4A61C0] focus:border-[#4A61C0]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  console.log('Search for:', (e.target as HTMLInputElement).value);
                }
              }}
            />
          </div>

          {/* 📱 MOBILE: Hamburger toggle */}
          <button
            className="text-3xl text-[#2a56c5]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* 📱 MOBILE: Dropdown menu when hamburger is toggled */}
      {menuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className="block relative group px-4 py-2 rounded-md"
                onClick={() => {
                  setMenuOpen(false);
                  setCurrentPath(item.href);
                }}
              >
                <span
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#2a56c5]' : 'text-[#b0b3bb] group-hover:text-[#2a56c5]'
                  }`}
                >
                  {item.name}
                </span>
                <span className="absolute inset-0 bg-[#2a56c5] opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-200"></span>
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
