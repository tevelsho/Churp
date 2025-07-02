import Image from "next/image";
import Link from "next/link";

const GettingStarted = () => {
  return (
    <div className="w-full bg-[#293044] py-24 flex flex-col items-center justify-center text-center">
      <div className="mb-8">
        <div className="w-24 h-24 relative mx-auto">
          <Image
            src="/Logo.svg" 
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>

      <h2 className="text-white text-4xl font-bold mb-8">
        Start sending your concerns now.
      </h2>

      <Link href="/start" target="_blank" rel="noopener noreferrer">
        <button className="bg-[#4A61C0] border-[#4A61C0] hover:bg-[#3b4e9a] text-white font-medium py-3 px-6 rounded-sm transition-colors duration-200">
          Get started
        </button>
      </Link>
    </div>
  );
};

export default GettingStarted;