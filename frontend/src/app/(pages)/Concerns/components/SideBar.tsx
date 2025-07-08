import React from 'react';

const SideBar: React.FC = () => {
  const trendingConcerns = [
    'Pests are out of control!',
    'Why do some people get to grow more crops than others?',
    'Why does he get a bigger plot?',
    'Someone stole my crops!',
    'Unfriendly Gardener in the community garden',
  ];

  const popularTopics = [
    'Urban Farming Initiatives',
    'Sustainable Gardening Practices',
    'Community Engagement in Green Spaces',
    'HDB Rooftop Gardens',
    'NParks Community Garden Grants',
  ];

  const generateSlug = (text: string) => {
    return `/Concerns/${encodeURIComponent(text.toLowerCase().replace(/\s/g, '-'))}`;
  };

  return (
    <div className="sticky">
      <div className="bg-white rounded-md mb-6">
        <h3 className="font-bold text-base mb-4 text-[#293044] text-left uppercase">Trending Concerns</h3>
        <ul className="space-y-2">
          {trendingConcerns.map((concern, index) => (
            <li key={index}>
              <a
                href={generateSlug(concern)}
                className="block text-[#293044] text-sm text-left py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {index + 1}. {concern}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-md">
        <h3 className="font-bold text-[#293044] mb-4text-[#293044] text-left uppercase mb-4">Popular Topics</h3>
        <ul className="space-y-2">
          {popularTopics.map((topic, index) => (
            <li key={index}>
              <a
                href={generateSlug(topic)}
                className="block text-gray-700 text-sm text-left py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {index + 1}. {topic}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;