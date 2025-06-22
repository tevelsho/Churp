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
          <p className="text-[#454953] mb-2">Not sure how to feedback?</p>
          <h2 className="text-4xl font-bold text-[#2C2E34]">Here’s how to raise your concern properly</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Common Questions */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <BsFillQuestionSquareFill className="text-white text-xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">What kind of concerns can I raise?</h3>
            <p className="text-[#454953] mb-4">
              You can share feedback about things like public spaces, cleanliness, facilities, or fairness in processes — basically anything affecting you or your neighbours.
            </p>
            <p className="text-[#454953]">
              If it’s bothering you and others too, confirm worth raising lah. But keep it constructive so something can actually be done.
            </p>
          </div>

          {/* How to Raise */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <IoIosChatboxes className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">How do I raise it?</h3>
            <p className="text-[#454953] mb-4">
              Use this platform to submit your concern — no need to post on socials where nothing gets followed up. Just tell us what happened, where, and how it’s affecting you.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-1 underline">
              Submit your concern here <LuExternalLink />
            </a>
          </div>

          {/* What Happens Next */}
          <div className="flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <FaSort className="text-white text-lg" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#2C2E34] mb-4">What happens after that?</h3>
            <p className="text-[#454953] mb-4">Once submitted, here’s what usually happens:</p>
            <div className="space-y-3 text-[#454953]">
              <p><span className="font-medium">1.</span> We verify and categorise the concern.</p>
              <p><span className="font-medium">2.</span> Relevant parties (e.g. RC/PA/Agencies) are notified.</p>
              <p><span className="font-medium">3.</span> Updates or responses are tracked and surfaced to you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcernsEducation;