"use client";
import React, { useState} from 'react';
import Header from './components/Header';
import Filter from './components/Filter';
import Grid from './components/GardenGrid';
import SideBar from "./components/SideBar";

export default function App() {
  const [checkedFilters, setCheckedFilters] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState(''); 
  return (
    <div className="max-w-screen-2xl px-16 mx-auto flex flex-col gap-6 mb-24">
      <Header onSearch={setSearchTerm}/>
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <Filter 
            checkedFilters={checkedFilters} 
            setCheckedFilters={setCheckedFilters} 
            />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <Grid checkedFilters={checkedFilters}  
          searchTerm={searchTerm}/>
        </div>
        <div className="w-full md:w-1/4 lg:w-1/5">
          <SideBar />
        </div>
      </div>
    </div>
  );
}
