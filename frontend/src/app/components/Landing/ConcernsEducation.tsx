'use client';

import { BsFillQuestionSquareFill } from "react-icons/bs";
import { IoIosChatboxes } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

const ConcernsEducation = () => {
  return (
    <section>
      <div className="max-w-screen-2xl mx-auto w-full px-4">
        <div className="mb-12">
          <p className="text-[#454953] mb-2">Lorem ipsum dolor sit amet?</p>
          <h2 className="text-4xl font-bold text-[#2C2E34]">Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <BsFillQuestionSquareFill className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Lorem ipsum dolor sit amet?</h3>
            <p className="text-[#454953] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[#454953]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <IoIosChatboxes className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Lorem ipsum dolor sit amet?</h3>
            <p className="text-[#454953] mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-1 underline">
              Lorem ipsum dolor sit amet <LuExternalLink />
            </a>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <FaSort className="text-white text-lg" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">Lorem ipsum dolor sit amet?</h3>
            <p className="text-[#454953] mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit:</p>
            <div className="space-y-3 text-[#454953]">
              <p><span className="font-medium">1.</span> Lorem ipsum dolor sit amet.</p>
              <p><span className="font-medium">2.</span> Lorem ipsum dolor sit amet.</p>
              <p><span className="font-medium">3.</span> Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsEducation;