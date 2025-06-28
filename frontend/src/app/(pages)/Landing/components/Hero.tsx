'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Hero = () => {
  return (
    <section className="w-full flex items-center justify-between">
      <div className="flex w-full bg-[#f8f9fd] py-16 ">
        <div className="max-w-screen-2xl mx-auto px-16 flex items-center justify-between w-full">
          <div className="flex-1 max-w-xl">
            <h1 className="text-6xl lg:text-7xl font-bold text-[#293044] mb-6">
              Got something to say ah?
            </h1>
            <p className="text-lg text-[#445072] mb-8 leading-relaxed">
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

          <div className="flex-1 flex justify-end">
            <Image
              src="/Stress.svg"
              alt="Concern Illustration"
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