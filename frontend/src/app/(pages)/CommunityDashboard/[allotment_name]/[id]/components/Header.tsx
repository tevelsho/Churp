'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const params = useParams();
  const { allotment_name, id } = params as { allotment_name: string; id: string };
  const [title, setPostTitle] = useState<string>('');
  const [ackStatus, setAckStatus] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  const [showEyeHoverBox, setShowEyeHoverBox] = useState(false);
  const [showResolveHoverBox, setShowResolveHoverBox] = useState(false);
  const [showToolsHoverBox, setShowToolsHoverBox] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    fetch(`/backend/concern?allotmentName=${decodeURIComponent(allotment_name)}&id=${id}`)
      .then((res) => res.json())
      .then((post) => {
        if (post?.title) setPostTitle(post.title);
        if (post?.ack_status) setAckStatus(post.ack_status);
      })
      .catch((err) => {
        console.error('Error fetching title:', err);
      });
  }, [allotment_name, id]);

  const renderBadge = () => {
    if (ackStatus === 'looking into it') {
      return (
        <div
          className="relative inline-flex items-center mt-[2px]"
          onMouseEnter={() => setShowEyeHoverBox(true)}
          onMouseLeave={() => setShowEyeHoverBox(false)}
        >
          <div className="px-1.5 py-0.5 rounded-lg bg-[#4A61C0]/70 text-base sm:text-lg text-white select-none">
            👀
          </div>
          {showEyeHoverBox && (
            <div className={`absolute bottom-full mb-2 z-50 ${isMobile ? 'left-0 ml-2' : 'left-1/2 -translate-x-1/2'}`}>
              <div className="bg-[#4A61C0]/90 px-3 py-2 rounded-xl shadow-lg text-sm text-white text-center whitespace-nowrap max-w-[90vw]">
                <p className="font-bold">Residential Network is looking into it</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (ackStatus === 'resolved') {
      return (
        <div
          className="relative inline-flex items-center mt-[2px]"
          onMouseEnter={() => setShowResolveHoverBox(true)}
          onMouseLeave={() => setShowResolveHoverBox(false)}
        >
          <div className="px-1.5 py-0.5 rounded-lg bg-[#4A61C0]/70 text-base sm:text-lg text-white select-none">
            ✅
          </div>
          {showResolveHoverBox && (
            <div className={`absolute bottom-full mb-2 z-50 ${isMobile ? 'left-0 ml-2' : 'left-1/2 -translate-x-1/2'}`}>
              <div className="bg-[#4A61C0]/90 px-3 py-2 rounded-xl shadow-lg text-sm text-white text-center whitespace-nowrap max-w-[90vw]">
                <p className="font-bold">Resolved by Residential Network</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (ackStatus === 'working on it') {
      return (
        <div
          className="relative inline-flex items-center mt-[2px]"
          onMouseEnter={() => setShowToolsHoverBox(true)}
          onMouseLeave={() => setShowToolsHoverBox(false)}
        >
          <div className="px-1.5 py-0.5 rounded-lg bg-[#4A61C0]/70 text-base sm:text-lg text-white select-none">
            🛠️
          </div>
          {showToolsHoverBox && (
            <div className={`absolute bottom-full mb-2 z-50 ${isMobile ? 'left-0 ml-2' : 'left-1/2 -translate-x-1/2'}`}>
              <div className="bg-[#4A61C0]/90 px-3 py-2 rounded-xl shadow-lg text-sm text-white text-center whitespace-nowrap max-w-[90vw]">
                <p className="font-bold">Residential Network is working on it</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mb-12 flex flex-col gap-y-3">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-2 sm:gap-y-0">
       <div className="flex flex-col items-start flex-1">
          {/* Title with badge */}
          {isMobile ? (
            <>
              <h2 className="text-lg font-bold text-gray-900 truncate">{title}</h2>
              <div className="mt-2">{renderBadge()}</div> {/* badge now under title */}
            </>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">{title}</h1>
              {renderBadge()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
