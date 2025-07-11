'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../../backend/lib/supabaseClient';

interface ConcernItem {
  id: number;
  title: string;
  location: string;
}

const SideBar: React.FC = () => {
  const [latestConcerns, setLatestConcerns] = useState<ConcernItem[]>([]);
  const [topLikedConcerns, setTopLikedConcerns] = useState<ConcernItem[]>([]);

  useEffect(() => {
    const fetchLatestConcerns = async () => {
      const { data, error } = await supabase
        .from('submission')
        .select('id, title, location')
        .eq('status', 'published')
        .order('submittedat', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching latest concerns:', error);
      } else {
        setLatestConcerns(data || []);
      }
    };

    const fetchTopLikedConcerns = async () => {
      const { data, error } = await supabase
        .from('submission')
        .select('id, title, location')
        .eq('status', 'published')
        .order('likes', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching top liked concerns:', error);
      } else {
        setTopLikedConcerns(data || []);
      }
    };

    fetchLatestConcerns();
    fetchTopLikedConcerns();
  }, []);

  const generateSlug = (id: number, location: string) => {
    const encodedLocation = encodeURIComponent(location);
    return `/CommunityDashboard/${encodedLocation}/${id}`;
  };

  return (
    <div className="sticky top-24 self-start">
      {/* Latest Concerns */}
      <div className="bg-white rounded-md mb-6">
        <h3 className="font-bold text-base mb-4 text-[#293044] text-left uppercase">Latest Concerns</h3>
        <ul className="space-y-2">
          {latestConcerns.map((concern, index) => (
            <li key={concern.id}>
              <a
                href={generateSlug(concern.id, concern.location)}
                className="block text-[#293044] text-sm text-left py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {index + 1}. {concern.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Top Liked Concerns */}
      <div className="bg-white rounded-md">
        <h3 className="font-bold text-base mb-4 text-[#293044] text-left uppercase">Top Liked Concerns</h3>
        <ul className="space-y-2">
          {topLikedConcerns.map((concern, index) => (
            <li key={concern.id}>
              <a
                href={generateSlug(concern.id, concern.location)}
                className="block text-[#293044] text-sm text-left py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {index + 1}. {concern.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
