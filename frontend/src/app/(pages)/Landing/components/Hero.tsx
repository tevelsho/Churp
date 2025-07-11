'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Hero = () => {
  return (
    <section className="w-full bg-[#f8f9fd] py-16">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between lg:h-[600px]">
          {/* Text Section - always comes first */}
          <div className="flex-1 max-w-2xl text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-[#293044] mb-6">
              Got something to say about your garden?
            </h1>
            <p className="text-lg text-[#293044] mb-8 leading-relaxed">
              Messy plots? Broken tools? No water again?<br />See what others face — or voice yours.
            </p>

            <div className="flex gap-4">
              <Link
                href="/CommunityDashboard"
                className="inline-flex items-center gap-2 whitespace-nowrap bg-[#4A61C0] hover:bg-[#3b4e9a] text-white px-4 py-3 rounded-sm font-medium transition-colors"
              >
                See common issues
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Image Section - goes below on mobile, right on desktop */}
          <div className="flex-1 mt-10 lg:mt-0 flex justify-start lg:justify-end">
            <Image
              src="/Planting.svg"
              alt="Planting Illustration"
              width={550}
              height={550}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
