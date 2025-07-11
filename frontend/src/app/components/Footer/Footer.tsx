'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="w-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 space-y-4 sm:space-y-0">
          <Link
            href="https://www.example.com/telescope"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-[#454953] text-lg font-semibold cursor-pointer hover:underline mb-2">
              Churp
            </h2>
          </Link>

          {/* Links */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
            <Link
              href="/documents/privacy-statement.pdf"
              className="text-[#BEBEBE] text-sm font-light hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Statement
            </Link>
            <Link
              href="/documents/terms-of-use.pdf"
              className="text-[#BEBEBE] text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-[#EDEDED] w-full mb-6" />

        {/* Built By and Copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end space-y-6 sm:space-y-0">
          <div className="flex flex-col items-start mb-6 sm:mb-0">
            <span className="text-[#666C7A] text-sm mb-2">Built by</span>
            <Image
              src="/ogp.png"
              alt="HearUs Logo"
              width={180}
              height={180}
            />
          </div>
          <p className="text-[#BEBEBE] text-xs">
            &copy; 2025 Churp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;