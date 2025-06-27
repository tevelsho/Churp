'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function App() {
  const [activeTab, setActiveTab] = useState('lorem-ipsum-tab-1');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const constituencies = [
    'Lorem Ipsum Dolor', 'Sit Amet Consectetur', 'Adipiscing Elit Sed', 'Do Eiusmod Tempor',
    'Incididunt Ut Labore', 'Et Dolore Magna', 'Aliqua Ut Enim', 'Ad Minim Veniam',
    'Quis Nostrud Exercitation', 'Ullamco Laboris Nisi', 'Ut Aliquip Ex Ea', 'Commodo Consequat Duis',
    'Aute Irure Dolor', 'In Reprehenderit', 'In Voluptate Velit', 'Esse Cillum Dolore',
    'Eu Fugiat Nulla', 'Pariatur Excepteur', 'Sint Occaecat Cupidatat', 'Non Proident Sunt',
    'In Culpa Qui Officia'
  ];

  const gridItems = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    image: `https://placehold.co/300x150/A7C7E7/FFFFFF?text=Lorem+Ipsum+${i + 1}`,
    name: `Lorem Ipsum ${i + 1}`,
    position: 'Dolor Sit Amet',
    location: 'Consectetur Adipiscing',
    pqCount: Math.floor(Math.random() * 500) + 100
  }));

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-16 sm:px-16 lg:px-16">
      <div className="max-w-full w-full p-8">
        <div className="max-w-screen-xl mx-auto mb-8 flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <h2 className="text-2xl font-bold text-gray-800 mr-2">Lorem Ipsum</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Dolor
              </span>
            </div>
            <a href="#" className="text-blue-500 text-sm hover:underline flex items-center mb-2">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l-.208.208A5.002 5.002 0 0110 21.828L5.657 20.343a4 4 0 11-5.657-5.656l1.101-1.102M19.106 5.894l-1.101 1.101m.758.758l.208-.208A5.002 5.002 0 0114 2.172L18.343 3.657a4 4 0 115.657 5.656l-1.101 1.102M13.828 10.172L19.106 5.894" />
              </svg>
              loremipsum.com
            </a>
            <p className="text-gray-700 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'lorem-ipsum-tab-1' && (
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify- gap-2 mb-8">
              {constituencies.map((constituency, index) => (
                <button
                  key={index}
                  className="bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-3 rounded-full transition-transform transform hover:scale-105 active:scale-95 text-sm text-center whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  {constituency}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start pt-0 max-w-screen-xl mx-auto">
          <div className="w-full md:w-1/4 lg:w-1/5 pr-0 md:pr-4 mb-6 md:mb-0">
            <input
              type="text"
              placeholder="Lorem ipsum..."
              className="w-full mb-4 border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <div className="relative mb-4">
              <button
                onClick={toggleFilterDropdown}
                className="w-full text-left py-2 px-3 border border-gray-300 rounded-md shadow-sm flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              >
                Lorem Ipsum
                <svg className={`fill-current h-4 w-4 transform transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.05 6.879 4.636 8.293 9.293 12.95z" />
                </svg>
              </button>
              {isFilterDropdownOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 p-3">
                  <label className="inline-flex items-center mb-2">
                    <input type="checkbox" className="form-checkbox text-blue-400" />
                    <span className="ml-2 text-gray-700">Lorem One</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-400" />
                    <span className="ml-2 text-gray-700">Lorem Two</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-auto">
              {gridItems.map((item) => (
                <Link href={`/Search/CommunityGardens/${item.id}`} key={item.id}>
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
                      <p className="text-gray-600 text-xs mb-0.5">{item.position}</p>
                      <p className="text-gray-500 text-xs flex items-center mb-2">
                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.727A8 8 0 0120 10c0-4.418-3.582-8-8-8S4 5.582 4 10c0 2.21.895 4.21 2.343 5.657L12 22l5.657-5.273z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {item.location}
                      </p>
                      <p className="text-blue-400 text-sm font-medium">
                        <span className="font-bold">{item.pqCount}</span> Lorem Ipsum
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
