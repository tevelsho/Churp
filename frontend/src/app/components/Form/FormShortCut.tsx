'use client';
import React from 'react';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const FormShortCut: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/Report');
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50
                   bg-[#4A61C0] hover:bg-[#3b4e9a] text-white rounded-l-lg shadow-lg cursor-pointer
                   w-12 h-12 p-2
                   flex items-center justify-center"
      >
        <HiOutlineNewspaper className="text-3xl" />
      </button>
    </>
  );
};

export default FormShortCut;
