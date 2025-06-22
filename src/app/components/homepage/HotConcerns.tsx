'use client';

import CardSwap, { Card } from "@/app/components/ui/Card/Card";

const HotConcerns = () => {
  return (
    <div className="flex w-full bg-blue-50/60 min-h-screen">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        {/* Left Content */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Got something to say ah?
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Sometimes things not fair, people not happy — but where to speak up? Whether it’s small feedback or big complaints, we believe everyone should have a place to be heard. Don’t just post and hope — share it where it counts.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              See common issues
            </button>
            <button className="text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-blue-100 hover:border-transparent">
              Share your concern
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex justify-end pr-4 lg:pr-24">
          <div style={{ height: '400px', position: 'relative' }}>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hot Concern 1</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec elit sed augue volutpat tincidunt.</p>
              </Card>
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hot Concern 2</h3>
                <p className="text-gray-600">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              </Card>
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hot Concern 3</h3>
                <p className="text-gray-600">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
              </Card>
              <Card className="p-6 bg-white shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Hot Concern 4</h3>
                <p className="text-gray-600">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotConcerns;
