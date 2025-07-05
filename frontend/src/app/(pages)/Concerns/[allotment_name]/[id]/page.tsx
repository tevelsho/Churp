'use client';
import React from 'react';
import Header from './components/Header';
import Breadcrumbs from '../../../../components/Navigation/BreadCrumbs';
import Concerns from "./components/Concern"
import SideBar from "../../components/SideBar"
import ReplyBox from './components/Reply'; 

export default function TestConcern() {

  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-screen-2xl">
        <Breadcrumbs />
        <div className="flex gap-12">
          <div className="w-full md:w-3/4 lg:w-4/5 pl-16">
            <Header />
            <Concerns />
            <div className="mt-8">
              <ReplyBox />
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/5">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
