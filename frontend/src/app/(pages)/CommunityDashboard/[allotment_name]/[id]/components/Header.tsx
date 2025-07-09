'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState('');
  const params = useParams();
  const { allotment_name, id } = params as { allotment_name: string; id: string };
  const [title, setPostTitle] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile screen on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640); // Tailwind's sm breakpoint is 640px
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
        if (post?.title) {
          setPostTitle(post.title);
        }
      })
      .catch((err) => {
        console.error('Error fetching title:', err);
      });
  }, [allotment_name, id]);

  const status = 'Solved';
  const dateLabel = 'Required';
  const concernInfo = 'Community Garden Maintenance';
  const badges = [
    { icon: '👀', bgColor: '#4A61C0' },
    { icon: '🌳', bgColor: '#2E6C3A' },
  ];

  return (
    <div className="mb-12 flex flex-col gap-y-3">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-2 sm:gap-y-0">
        <div className="flex flex-col items-start flex-1">
          {isMobile ? (
            <h2 className="text-lg font-bold text-gray-900 flex flex-wrap items-center gap-x-4 overflow-hidden">
              <span className="truncate max-w-full">{title}</span>
              <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 text-sm font-medium whitespace-nowrap">
                {status}
              </span>
            </h2>
          ) : (
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-x-4 overflow-hidden">
              <span className="truncate max-w-full">{title}</span>
              <span className="px-3 py-1 rounded-lg bg-green-100 text-green-800 text-sm font-medium whitespace-nowrap">
                {status}
              </span>
            </h1>
          )}

          <p className="text-gray-600 text-sm flex flex-wrap items-center mt-2">
            {dateLabel} {currentDate}
            <span className="ml-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium mt-1 sm:mt-0">
              {concernInfo}
            </span>
          </p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="px-2 py-1 opacity-70 rounded-lg text-md text-white select-none"
              style={{ backgroundColor: badge.bgColor }}
            >
              {badge.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
