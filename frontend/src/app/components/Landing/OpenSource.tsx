import Image from 'next/image';
import Link from 'next/link';

const OpenSource = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
        <div className="lg:w-1/2 lg:pl-12 mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Lorem ipsum dolor
          </h2>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <Link href="#" className="text-blue-500 font-medium hover:underline flex items-center">
            Lorem ipsum dolor <span className="ml-1 text-lg">&rarr;</span>
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <div className="bg-gray-200 rounded-lg flex items-center justify-center" style={{ width: 'min(100%, 500px)', height: '300px' }}>
            <span className="text-gray-500 text-center">Lorem Ipsum Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;