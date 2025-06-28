'use client';
import React from 'react';
import Header from '../components/Header';
import Filter from '../components/Filter';
import Grid from '../components/Grid';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 sm:px-10 lg:px-16 py-8">
      <div className="w-full max-w-screen-xl">
        <Header />
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0 md:pr-4">
            <Filter />
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5">
            <Grid />
          </div>
        </div>
      </div>
    </div>
  );
}
