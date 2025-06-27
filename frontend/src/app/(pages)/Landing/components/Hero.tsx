'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Hero = () => {
  return (
    <div className="flex w-full bg-[#f8f9fd] py-16">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        {/* Main Hero Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
            Got something to say ah?
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Sometimes things not fair, people not happy — but where to speak up?
          </p>

          <div className="flex gap-4">
            <Link
              href="/concerns"
              className="inline-flex items-center gap-2 bg-[#4A61C0] hover:bg-[#3b4e9a] text-white px-4 py-3 rounded-sm font-medium transition-colors"
            >
              See common issues
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-end pr-4 lg:pr-28">
          <Image
            src="/Stress-rafiki.svg"
            alt="Concern Illustration"
            width={520}
            height={520}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;