import Image from "next/image";

const GettingStarted = () => {
  return (
    <div className="w-full bg-[#293044] py-24 flex flex-col items-center justify-center text-center">
      {/* Placeholder Logo */}
      <div className="mb-8">
        <div className="w-16 h-16 relative">

        </div>
      </div>

      <h2 className="text-white text-4xl font-bold mb-8">
        Start sending your concerns now.
      </h2>
      <button className="bg-[#3B4E9A] border-[#3B4E9A] text-white font-medium py-3 px-4 rounded-sm transition-colors duration-200">
        Get started
      </button>
    </div>
  );
};

export default GettingStarted;