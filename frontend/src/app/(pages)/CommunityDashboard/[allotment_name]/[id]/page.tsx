'use client';
import React, { useState}  from 'react';
import Header from './components/Header';
import Breadcrumbs from '../../../../components/Navigation/BreadCrumbs';
import Concerns from "./components/Concern"
import SideBar from "../../components/SideBar"
import ReplyBox from './components/Reply'; 

export default function TestConcern() {
  const [refreshReplyBox, setRefreshReplyBox] = useState(false);

  const handleTriggerReplyBoxUpdate = () => {
    setRefreshReplyBox(prev => !prev); // toggles trigger
  };

  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white mb-24">
      <div className="w-full max-w-screen-2xl">
        <Breadcrumbs />
        <div className="flex gap-12">
          <div className="w-full md:w-3/4 lg:w-4/5 pl-16">
            <Header />
            <Concerns onButtonClick={handleTriggerReplyBoxUpdate}/>
            <div className="mt-8">
              <ReplyBox trigger={refreshReplyBox}/>
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
