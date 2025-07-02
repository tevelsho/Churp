'use client';
import React from 'react';
import Header from './components/Header';
import Breadcrumbs from '../../../../components/Navigation/BreadCrumbs';
import Concerns from "./components/Concerns";
import SideBar from "./components/SideBar";

export default function TestConcern() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-screen-2xl">
        <Breadcrumbs />
        <Header />
        <div className="flex px-16 gap-12">
          <div className="flex-grow">
            <Concerns />
          </div>
          <div className="w-[800px]">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}