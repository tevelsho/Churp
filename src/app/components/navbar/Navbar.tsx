'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosMenu } from 'react-icons/io';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '/' },
    { name: 'Search', href: '/search' },
    { name: 'Know Your Garden', href: '/discover' },
    { name: 'Know the Complaints', href: '/concerns' },
    { name: 'Submit', href: '/submit' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav className="bg-white shadow- w-full">
      <div className="w-full max-w-screen-2xl mx-auto px-4 py-3 flex items-center">
        {/* Left side: Logo + Nav */}
        <div className="flex items-center space-x-8 flex-grow">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/images/logo/logo.svg"
              alt="HearUs Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
          <div className="hidden sm:flex sm:space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.name === 'About' && pathname === '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group px-2 py-1 rounded-md flex-shrink-0"
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
                </Link>
              );
            })}
          </div>
        </div>

        {/* Send Concern Button */}
        <div className="hidden sm:block">
          <Link
            href="/send-concern"
            className="text-sm font-medium text-black border border-gray-300 px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#2a56c511] hover:border-transparent"
          >
            Share Concern
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-3xl text-[#2a56c5] ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <IoIosMenu />
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.name === 'About' && pathname === '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className="block relative group px-4 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#2a56c5]'
                      : 'text-[#b0b3bb] group-hover:text-[#2a56c5]'
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className="absolute inset-0 bg-[#2a56c5] opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-200"
                ></span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
