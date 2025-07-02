'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const steps = [
  "Go to 'Report' section",
  "Share a concern by filling up the form",
  "View and interact with their own and other gardeners’ concerns under the “Concerns” section",
  'Get status updates from the Residents’ Network on their concerns.',
  'Follow up with the Residents’ Network on their concerns to ensure proper resolution.'
];

const steps2 = [
  "Reviews concerns, gives status updates, and supports follow-ups to ensure proper resolution.",
  "Assess and Prioritise Concerns to determine appropriate next steps.",
  "Update the platform to inform gardeners whether a concern is being reviewed, in progress, or resolved.",
  "Engage in further discussion or clarification if a gardener follows up on their submission.",
  "Mark concerns as resolved and share what actions were taken to address the issue, ensuring transparency"

]

const Guide = () => {
  const [activeTab, setActiveTab] = useState<'storage' | 'multi'>('storage');
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);
  const contentRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measureHeights = () => {
      const h1 = contentRef1.current?.getBoundingClientRect().height || 0;
      const h2 = contentRef2.current?.getBoundingClientRect().height || 0;
      setMaxHeight(Math.max(h1, h2));
    };

    measureHeights();
    window.addEventListener('resize', measureHeights);
    return () => window.removeEventListener('resize', measureHeights);
  }, []);

  return (
    <div className="w-full bg-[#f8f9fd] py-24">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-start gap-12">
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#293044] mb-8">
            How it works
          </h2>

          <div className="flex mb-6">
            <button
              className={`py-3 text-base font-semibold transition-colors duration-200 ${
                activeTab === 'storage'
                  ? 'text-[#4A61C0] border-b-2 border-[#4A61C0]'
                  : 'text-[#445072] hover:text-[#293044]'
              }`}
              onClick={() => setActiveTab('storage')}
            >
              Community / Allotment Gardener
            </button>
            <button
              className={`py-3 ml-6 text-base font-semibold transition-colors duration-200 ${
                activeTab === 'multi'
                  ? 'text-[#4A61C0] border-b-2 border-[#4A61C0]'
                  : 'text-[#445072] hover:text-[#293044]'
              }`}
              onClick={() => setActiveTab('multi')}
            >
              Residential Network
            </button>
          </div>

          <div
            className="relative transition-all duration-300 ease-in-out"
            style={{ minHeight: maxHeight > 0 ? maxHeight : 'auto' }}
          >
            {/* STORAGE MODE */}
            <div
              ref={contentRef1}
              className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                activeTab === 'storage' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <p className="text-base text-[#445072] mb-6 leading-relaxed max-w-3xl">
               Community and allotment gardeners can share updates, concerns, or ideas about their neighbourhood garden through a simple form on the website. 
               They can also view and interact with others’ posts on the Community Dashboard, 
               stay informed about how issues are being handled, and connect with fellow gardeners—all with support from local Residents’ Networks and official channels.
              </p>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#4A61C0] text-white rounded-md flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-base text-[#445072] leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MULTI-RESPONDENT MODE */}
            <div
              ref={contentRef2}
              className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                activeTab === 'multi' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <p className="text-base text-[#445072] mb-6 leading-relaxed max-w-3xl">
               The Residents’ Network reviews and responds to community concerns, 
               provides status updates on issues, and supports follow-ups to ensure proper resolution and meaningful action.
              </p>

              <div className="space-y-4">
                {steps2.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-[#4A61C0] text-white rounded-md flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-base text-[#445072] leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-start">
          <Image
            src="/Online.svg"
            alt="How it works"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Guide;
