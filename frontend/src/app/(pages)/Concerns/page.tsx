import React from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import Grid from './components/GardenGrid';
import SideBar from "./components/SideBar";

export default function App() {
  return (
    <div className="max-w-screen-2xl px-16 mx-auto flex flex-col gap-6">
      <Header />
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <Filter />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <Grid />
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
