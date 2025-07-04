'use client';
import React from 'react';
import { useParams, notFound } from 'next/navigation';

import Header from './components/Header';
import Breadcrumbs from '../../../components/Navigation/BreadCrumbs';
import Concerns from "./components/Concerns";
import SideBar from "./components/SideBar";

// used temporarily until backend is linked
const validAllotments = ['garden1', 'garden2', 'garden3'];

export default function TestConcern() {
  const { allotment_name } = useParams() as { allotment_name: string };

if (!validAllotments.includes(allotment_name as string)) {
    notFound();
    }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-screen-2xl">
        {/* In the future, might be better to use Breadcrumbs=allotment_name */}
        <Breadcrumbs />
        <Header />
        <div className="flex px-16 gap-12">
          <div className="flex-grow">
            <Concerns allotmentName={allotment_name}/>
          </div>
          <div className="w-[800px]">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
