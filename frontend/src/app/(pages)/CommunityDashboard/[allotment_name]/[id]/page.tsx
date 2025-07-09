'use client';
import React, { useState } from 'react';
import Header from './components/Header';
import Breadcrumbs from '../../../../components/Navigation/BreadCrumbs';
import Concerns from "./components/Concern";
import SideBar from "../../components/SideBar";
import ReplyBox from './components/Reply';

export default function TestConcern() {
  const [refreshReplyBox, setRefreshReplyBox] = useState(false);

  const handleTriggerReplyBoxUpdate = () => {
    setRefreshReplyBox(prev => !prev); // Toggle to refresh ReplyBox
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white mb-24">
      <div className="w-full max-w-screen-2xl">

        {/* Breadcrumbs - Shared across both views */}
        <Breadcrumbs />

        {/* ================= Desktop View ================= */}
        {/* Only shows on md and above */}
        <div className="hidden md:flex gap-12">
          <div className="w-full md:w-3/4 lg:w-4/5 pl-16">
            <Header />
            <Concerns onButtonClick={handleTriggerReplyBoxUpdate} />
            <div className="mt-8">
              <ReplyBox trigger={refreshReplyBox} />
            </div>
          </div>
          <div className="w-full md:w-1/4 lg:w-1/5">
            <SideBar />
          </div>
        </div>

        {/* ================= Mobile View ================= */}
        {/* Only shows on small screens */}
        <div className="flex flex-col md:hidden px-4 space-y-6">
          {/* Mobile Header */}
          <Header />

          {/* Concern component with button trigger */}
          <Concerns onButtonClick={handleTriggerReplyBoxUpdate} />

          {/* Reply Box */}
          <ReplyBox trigger={refreshReplyBox} />

          {/* Sidebar moved to bottom for mobile view */}
          <SideBar />
        </div>

      </div>
    </div>
  );
}
