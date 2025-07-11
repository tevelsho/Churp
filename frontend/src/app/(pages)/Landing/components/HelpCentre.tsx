'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { FaExternalLinkAlt } from 'react-icons/fa';

const faqs = [
  {
    question: 'What kind of issues can I report?',
    answer: `You can report anything related to the garden — such as maintenance issues, safety concerns, pest problems, or even new ideas for improvement and beautification.`
  },
  {
    question: 'How long does it usually take to resolve a concern?',
    answer: `Resolution times vary depending on the issue’s complexity and urgency. You can track progress through status updates on the Community Dashboard.`
  },
  {
    question: 'Can I remain anonymous when submitting a concern?',
    answer: `Yes, all submissions on the platform are currently anonymous by default. Your personal details are not shared.`
  },
  {
    question: 'Can I suggest improvements or ideas that are not problems?',
    answer: `Absolutely! The platform welcomes all ideas, suggestions, and positive updates to help improve the garden community.`
  }
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getHeight = (index: number) => {
    const element = contentRefs.current[index];
    return element ? element.scrollHeight : 0;
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-16 py-24">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
            Help Center
          </h2>
          <p className="text-base text-[#445072] mb-8 leading-relaxed">
            Got a question? You might find the answer faster in our Help Center.
            <br />
            Popular questions include:
          </p>

          <div className="space-y-2 text-[#445072] mb-12">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`
                    border-b border-gray-200 
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'border border-[#4A61C0] rounded bg-gray-50 border-b-[#4A61C0]' : ''}
                  `}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex justify-between items-center text-left px-4 py-3 focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <IoIosArrowDown
                      className={`transform transition-transform duration-300 ease-in-out flex-shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-[#4A61C0]' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      height: isOpen ? `${getHeight(idx)}px` : '0px',
                    }}
                  >
                    <div 
                      ref={(el) => { contentRefs.current[idx] = el; }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm text-[#445072] leading-relaxed mb-3 pt-2">
                        {faq.answer}
                      </p>
                      <Link
                        href="#"
                        className="text-[#4A61C0] text-sm inline-flex items-center gap-2 font-medium hover:underline transition-colors duration-200"
                      >
                        Read more <FaExternalLinkAlt className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            href="https://yourhelpcenter.url"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4A61C0] font-medium hover:underline flex items-center mt-6 transition-colors duration-200"
          >
            Visit our Help Center <BsFillQuestionCircleFill className="ml-2" />
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src="/Question.svg"
            alt="Help Center Illustration"
            width={550}
            height={550}
            className="rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;