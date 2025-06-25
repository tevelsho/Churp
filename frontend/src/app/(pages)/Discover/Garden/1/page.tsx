'use client';
import { useState } from 'react';

export default function Tengah() {
  const [activeTab, setActiveTab] = useState('redeemsg'); 

  return (
    <div className="min-h-screen mt-24">
      <div className="max-w-screen-2xl mx-auto bg-white rounded-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h1>

        <div className="flex mb-8">
          <button
            className={`py-3 mr-6 text-lg font-medium ${
              activeTab === 'redeemsg'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('redeemsg')}
          >
            Lorem Ipsum Rewards
          </button>
          <button
            className={`py-3 text-lg font-medium ${
              activeTab === 'customised'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('customised')}
          >
            Customised Lorem
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'redeemsg' && (
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center text-indigo-600 hover:text-indigo-800 mb-8">
              <a href="#" className="text-lg font-medium mr-2">
                Lorem ipsum dolor sit amet
              </a>
              {/* You can use an SVG for the arrow icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-lg flex items-center">
              Find out more
              {/* You can use an SVG for the arrow icon here */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {activeTab === 'customised' && (
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              This is the content for the Customised Lorem tab. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua.
            </p>
            {/* Add more content specific to the customised tab */}
          </div>
        )}
      </div>
    </div>
  );
}