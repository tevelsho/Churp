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
        <div className="flex px-16 gap-12">
          <div className="flex-grow">
            <Header/>
            <Concerns />
            <div className="mt-8">
              <ReplyBox
              />
            </div>
          </div>
          <div className="w-[800px]">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
