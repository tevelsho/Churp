'use client';

import { useState } from 'react';
import Stepper, { Step } from "../Stepper/Stepper"
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';

const Usage = () => {
  const [name, setName] = useState('');

  return (
    <section className="max-w-screen-lg mx-auto py-24">
      <div className="flex flex-col md:flex-row items-start gap-12">
        <div className="flex-1 min-w-[300px]">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Lorem Ipsum"
            nextButtonText="Lorem Ipsum"
          >
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Lorem Ipsum Dolor</h2>
                <p className="text-[#454953]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Lorem Ipsum Dolor</h2>
                <p className="text-[#454953]">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Lorem Ipsum Dolor (Optional)</h2>
                <p className="text-[#454953] mb-3">Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Lorem ipsum (optional)"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </Step>
            <Step>
              <div className="bg-blue-100/70 p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold text-[#2C2E34] mb-2">Lorem Ipsum Dolor!</h2>
                <p className="text-[#454953]">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              </div>
            </Step>
          </Stepper>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-[#2C2E34] mb-6">Lorem Ipsum Dolor</h2>
          <p className="text-[#454953] text-base mb-8">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.<br />Consectetur, adipisci velit.
          </p>
          <Link
            href="#"
            className="text-blue-500 hover:text-blue-600 font-semibold inline-flex items-center gap-1 mt-8"
          >
            Lorem ipsum dolor sit amet <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Usage;