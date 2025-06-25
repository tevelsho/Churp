'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react'; 

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
                    {/* Using a standard <a> tag instead of Next.js Link */}
                    <a
                      href={item.href}
                      className="block text-gray-700 hover:text-[#2a56c5] text-sm transition-colors duration-200 py-1 whitespace-nowrap"
                      onClick={onClose}
                    >
                      {item.name}
                    </a>
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
  const [currentPath, setCurrentPath] = useState('/');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
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

  const navItems = [
    { name: 'About', href: '/' },
    { name: 'Search', type: 'dropdown', href: '/Search' },
    { name: 'Discover', href: '/Discover' },
    { name: 'Post or Report', href: '/Submit' },
  ];

  return (
    <nav className="bg-white shadow- w-full relative z-40">
      <div className="w-full max-w-screen-2xl mx-auto py-3 flex items-center">
        <div className="flex items-center space-x-8 flex-grow">
          <a href="/" className="flex-shrink-0" onClick={() => setCurrentPath('/')}>
            <img
              src="/HearUs.svg" 
              alt="HearUs Logo"
              width={140}
              height={140}
              className=""
            />
          </a>
          <div className="hidden sm:flex sm:space-x-6">
            {navItems.map((item) => {
              const isActive = (item.href && currentPath === item.href) || (item.name === 'About' && currentPath === '/');

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
                      {item.name} <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${searchDropdownOpen ? 'rotate-180' : ''}`} />
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
              }
              return null;
            })}
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden sm:block relative">
            <div
              className="flex items-center w-64 px-4 py-2 border border-[#BFC2C8] rounded-md bg-transparent"
            >
              <Search className="w-5 h-5 text-gray-500" /> 
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="ml-2 outline-none bg-transparent text-sm w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Search for:', (e.target as HTMLInputElement).value);
                  }
                }}
              />
            </div>
          </div>

          <button
            className="sm:hidden text-3xl text-[#2a56c5] ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            if (item.type === 'dropdown' && item.name === 'Search') {
              return (
                <a
                  key={item.name}
                  href={item.href || '/search'}
                  className="block relative group px-4 py-2 rounded-md"
                  onClick={() => {
                    setMenuOpen(false);
                    setCurrentPath(item.href || '/search');
                  }}
                >
                  <span
                    className={`text-base font-medium transition-colors duration-200 ${
                      (currentPath === '/search' || currentPath.startsWith('/search/'))
                        ? 'text-[#2a56c5]'
                        : 'text-[#b0b3bb] group-hover:text-[#2a56c5]'
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className="absolute inset-0 bg-[#2a56c5] opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-200"
                  ></span>
                </a>
              );
            }

            if (item.href) {
              const isActive = currentPath === item.href || (item.name === 'About' && currentPath === '/');
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
                </a>
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
