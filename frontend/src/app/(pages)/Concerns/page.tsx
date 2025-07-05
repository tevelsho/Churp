'use client';
import React from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import Grid from './components/GardenGrid';
import SideBar from "./components/SideBar"

export default function App() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header at the top of the page */}
      <Header />
      
      {/* Filter and Grid layout */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <Filter />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <Grid />
        </div>
        <div className="w-[200px]">
          <SideBar />
        </div>
      </div>
    </div>
  );
}