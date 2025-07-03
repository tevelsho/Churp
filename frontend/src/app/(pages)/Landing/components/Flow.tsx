'use client';

import { IoMdShare } from "react-icons/io";
import { MdSpaceDashboard, MdUpdate } from "react-icons/md"; 

const ConcernsEducation = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto w-full px-16 py-24">
        <div className="mb-12">
          <p className="text-[#454953] mb-2">Not sure of the flow?</p>
          <h2 className="text-4xl font-bold text-[#2C2E34]">Here are the key steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Share Your Concerns */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#4A61C0] rounded-full flex items-center justify-center mr-4">
                <IoMdShare className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Share Your Concerns</h3>
            <p className="text-[#454953] mb-4">
              Submit updates, concerns, or ideas about your garden via a simple form in the “Reports” section. Your input helps improve the neighbourhood.
            </p>
          </div>

          {/* Community Dashboard */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#4A61C0] rounded-full flex items-center justify-center mr-4">
                <MdSpaceDashboard className="text-white text-2xl" /> 
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Community Dashboard</h3>
            <p className="text-[#454953] mb-4">
              View and interact with community-shared concerns and updates. Connect with other gardeners and see how issues are being addressed with official support.
            </p>
          </div>

          {/* Stay Updated and Follow Up */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#4A61C0] rounded-full flex items-center justify-center mr-4">
                <MdUpdate className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Stay Updated and Follow Up</h3>
            <p className="text-[#454953] mb-4">
              Get status updates on your concerns (reviewed, in progress, resolved). Follow up directly to ensure meaningful action and resolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsEducation;