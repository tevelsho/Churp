'use client';
import React from 'react';
import Header from './components/Header';
import Breadcrumbs from '../../../../components/Navigation/BreadCrumbs';
import Concerns from "../TestConcern/components/Concerns"

export default function TestConcern() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-screen-2xl">
        <Breadcrumbs />
        <Header />
        <Concerns/>
      </div>
    </div>
  );
}
