'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosMenu, IoIosSearch } from 'react-icons/io';
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";

interface SearchDropdownProps {
  onClose: () => void;
}

const SearchDropdown = ({ onClose }: SearchDropdownProps) => {
  const dropdownContent = {
    'Use cases': [
      { name: 'AI Transformation', href: '/search/ai-transformation' },
      { name: 'Roadmapping', href: '/search/roadmapping' },
      { name: 'Agile practices', href: '/search/agile-practices' },
      { name: 'Prototyping', href: '/search/prototyping' },
      { name: 'Customer Journey Mapping', href: '/search/customer-journey-mapping' },
      { name: 'Organizational Design', href: '/search/organizational-design' },
      { name: 'Goal Management', href: '/search/goal-management' },
    ],
    'Teams': [
      { name: 'Engineering', href: '/search/engineering' },
      { name: 'Design & UX', href: '/search/design-ux' },
      { name: 'Product', href: '/search/product' },
      { name: 'IT', href: '/search/it' },
      { name: 'Marketing', href: '/search/marketing' },
      { name: 'Project Management', href: '/search/project-management' },
    ],
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg border border-gray-100 transition-all duration-300 ease-in-out transform origin-top opacity-95">
      <div className="px-6 py-8">
        <div className="grid grid-cols-2 gap-8 w-max">
          {Object.entries(dropdownContent).map(([title, items]) => (
            <div key={title} className="space-y-3 min-w-[200px]">
              <h3 className="font-semibold text-gray-500 uppercase text-xs tracking-wide mb-3">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-[#2a56c5] text-sm transition-colors duration-200 py-1 whitespace-nowrap"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    setSearchActive(prev => !prev);
    if (!searchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  const handleSearchBlur = () => {
    if (!searchInputRef.current?.value) {
      setSearchActive(false);
    }
  };

  const navItems = [
    { name: 'About', href: '/' },
    { name: 'Search', type: 'dropdown', href: '/Search' },
    { name: 'Discover', href: '/Discover' },
    { name: 'Concerns', href: '/Concerns' },
  ];

  return (
    <nav className="bg-white shadow- w-full relative z-40">
      <div className="w-full max-w-screen-2xl mx-auto px-4 py-3 flex items-center">
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
              const isActive = (item.href && pathname === item.href) || (item.name === 'About' && pathname === '/');

              if (item.type === 'dropdown' && item.name === 'Search') {
                return (
                  <div
                    key={item.name}
                    ref={searchDropdownRef}
                    className="relative group px-2 py-1 rounded-md flex-shrink-0 cursor-pointer"
                    onMouseEnter={() => setSearchDropdownOpen(true)}
                    onMouseLeave={() => setSearchDropdownOpen(false)}
                  >
                    <span
                      className={`text-base font-medium transition-colors duration-200 flex items-center gap-1 ${
                        searchDropdownOpen
                          ? 'text-[#2a56c5]'
                          : 'text-[#A0A4AD] group-hover:text-[#2a56c5]'
                      }`}
                    >
                      {item.name} <IoIosArrowDown className={`transition-transform duration-200 ${searchDropdownOpen ? 'rotate-180' : ''}`} />
                    </span>
                    <span
                      className="absolute inset-0 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-20"
                      style={{ backgroundColor: '#2a56c5' }}
                    ></span>

                    <div
                      className={`absolute top-full left-0 transition-all duration-300 ease-in-out origin-top-left z-50
                        ${searchDropdownOpen ? 'visible opacity-100 scale-y-100' : 'invisible opacity-0 scale-y-0'}
                        `}
                      style={{ paddingTop: '1.5rem', marginBottom: '-1.5rem' }}
                    >
                      <SearchDropdown onClose={() => setSearchDropdownOpen(false)} />
                    </div>
                  </div>
                );
              }

              if (item.href) {
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
              }
              return null;
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <Link
              href="/send-concern"
              className="text-sm font-medium text-black border border-gray-300 px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#2a56c511] hover:border-transparent"
            >
              Share Concern
            </Link>
          </div>

          <div className="hidden sm:block relative">
            <div
              className={`flex items-center transition-all duration-300 ease-in-out cursor-pointer py-2 ${
                searchActive ? 'w-64 px-4' : 'w-10 h-10 justify-center'
              } hover:bg-[#2a56c511] rounded-full`}
              onMouseEnter={() => !searchActive && setSearchActive(true)}
              onMouseLeave={() => !searchInputRef.current?.value && setSearchActive(false)}
              onClick={handleSearchClick}
            >
              <IoIosSearch className={`text-3xl transition-colors duration-200 ${searchActive ? 'text-[#2a56c5]' : 'text-gray-500'}`} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className={`ml-2 outline-none bg-transparent text-sm w-full transition-all duration-300 ease-in-out ${
                  searchActive ? 'block' : 'hidden'
                }`}
                onBlur={handleSearchBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Handle search submission here
                    console.log('Search for:', (e.target as HTMLInputElement).value);
                    setSearchActive(false);
                  }
                }}
              />
            </div>
          </div>

          <button
            className="sm:hidden text-3xl text-[#2a56c5] ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoIosMenu />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            if (item.type === 'dropdown' && item.name === 'Search') {
              return (
                <Link
                  key={item.name}
                  href={item.href || '/search'}
                  className="block relative group px-4 py-2 rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <span
                    className={`text-base font-medium transition-colors duration-200 ${
                      (pathname === '/search' || pathname.startsWith('/search/'))
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
            }

            if (item.href) {
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
            }
            return null;
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;