// src/app/components/homepage/Help.tsx
import Image from 'next/image';
import Link from 'next/link';

const Help = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Lorem Ipsum
          </h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul className="space-y-4 text-gray-700 mb-6">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Lorem ipsum dolor sit amet?</span>
              <span>&rarr;</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Consectetur adipiscing elit?</span>
              <span>&rarr;</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Tempor incididunt ut labore et dolore?</span>
              <span>&rarr;</span>
            </li>
            <li className="flex justify-between items-center border-b pb-2">
              <span>Magna aliqua ut enim ad minim?</span>
              <span>&rarr;</span>
            </li>
          </ul>
          <Link href="#" className="text-blue-500 font-medium hover:underline flex items-center">
            Lorem ipsum dolor <span className="ml-1 text-lg">&rarr;</span>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center" style={{ width: 'min(100%, 500px)', height: '300px' }}>
            <span className="text-gray-500 text-center">Lorem Ipsum Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;