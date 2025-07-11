'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import React from 'react';

const labelMap: Record<string, string> = {
  Search: 'All Gardens',
  Discover: 'Discover',
  CommunityGardens: 'Community Gardens',
  CommunityDashboard: 'Community Dashboard',
  General: 'General',
  '1': 'Tengah',
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const visibleSegments = segments.slice(-2);
  const baseIndex = segments.length - visibleSegments.length;

  return (
    <div className="max-w-screen-2xl mt-12 mb-20 px-16 mx-auto mb-8 text-sm text-gray-500 flex items-center flex-wrap gap-x-2">
      {visibleSegments.map((segment, i) => {
        const realIndex = baseIndex + i;
        const href = '/' + segments.slice(0, realIndex + 1).join('/');
        const isLast = i === visibleSegments.length - 1;

        const label =
          labelMap[segment] ||
          decodeURIComponent(segment)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());




        return (
          <React.Fragment key={href}>
            {i > 0 && <IoIosArrowForward className="text-gray-400" />}
            {isLast ? (
              <span className="font-semibold text-gray-700">{label}</span>
            ) : (
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;