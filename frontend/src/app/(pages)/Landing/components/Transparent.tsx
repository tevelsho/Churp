import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Transparent = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-16 py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#293044] mb-4 leading-tight">
            Transpareny
          </h2>
          <p className="text-base text-[#445072] mb-10 leading-relaxed">
            No more being in the dark, one single source of truth for everyone. We ensure that you
          </p>
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A61C0] font-medium hover:underline flex items-center"
          >
            Read More <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/Collab.svg"  
            alt="Transparent illustration"
            width={600}
            height={600}
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Transparent;
