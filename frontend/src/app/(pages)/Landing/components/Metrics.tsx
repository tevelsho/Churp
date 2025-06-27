'use client';

import React from 'react';

const stats = [
  {
    value: '1,025,009',
    label: 'FORMS LAUNCHED',
  },
  {
    value: '244,185,221',
    label: 'SUBMISSIONS RECEIVED',
  },
  {
    value: '209,925',
    label: 'PUBLIC OFFICERS ONBOARD',
  },
  {
    value: '164',
    label: 'GOVERNMENT AGENCIES',
  },
];

const Metrics = () => {
  return (
    <section className="w-full py-32 px-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#293044] mb-16">
          Used by some people
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <p className="text-3xl font-bold text-[#4A61C0]">{stat.value}</p>
              <p className="text-lg text-[#445072]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;