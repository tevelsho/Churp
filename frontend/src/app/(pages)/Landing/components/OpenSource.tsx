import Image from 'next/image';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const OpenSource = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between">
        <div className="lg:w-1/2 lg:pl-12 mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#293044] mb-4 leading-tight">
            Open sourced
          </h2>
          <p className="text-base text-[#445072] mb-10 leading-relaxed">
            Our code is open source, meaning anyone can help improve it and build on it, even you.
          </p>
          <Link
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A61C0] font-medium hover:underline inline-flex items-center gap-2"
          >
            Fork it on GitHub <FaGithub />
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-start">
          <Image
            src="/SourceCode.svg" 
            alt="Open source illustration"
            width={550}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenSource;