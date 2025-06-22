'use client';

import { useState } from 'react';
import Stepper, { Step } from '../ui/Stepper/Stepper';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';

const Usage = () => {
  const [name, setName] = useState('');

  return (
    <section className="max-w-screen-lg mx-auto py-48">
      <div className="flex flex-col md:flex-row items-start gap-12">
        {/* Left: Stepper */}
        <div className="flex-1 min-w-[300px]">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Step 1: Understand the Platform</h2>
                <p className="text-[#454953]">You can use this platform to submit issues affecting your community. Whether it's noise, cleanliness, or shared facilities — every concern matters.</p>
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Step 2: Describe Your Concern</h2>
                <p className="text-[#454953]">Tell us exactly what the problem is. Be specific — include location, what happened, and when. Clear descriptions help action to be taken faster.</p>
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Step 3: Your Details (Optional)</h2>
                <p className="text-[#454953] mb-3">You can leave your name so we can follow up, or submit anonymously if you prefer.</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Step 4: Submitted!</h2>
                <p className="text-[#454953]">Thank you for raising your concern. It will be routed to the right party and we’ll try our best to follow up transparently.</p>
              </div>
            </Step>
          </Stepper>
        </div>

        {/* Right: Explanation Text */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#2C2E34] mb-6">How to Raise a Concern</h2>
          <p className="text-[#454953] text-base mb-8">
            The steps on the left guide you through a simple, clear process to share your concern. It’s built to be transparent, constructive, and quick — so your voice is not just heard, but also followed up.
          </p>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1 mt-8"
          >
            Learn more about the process <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Usage;
