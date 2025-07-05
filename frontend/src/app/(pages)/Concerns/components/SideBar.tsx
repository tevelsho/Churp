import React from 'react';

const SideBar: React.FC = () => {
  const trendingConcerns = [
    'Community Garden Access',
    'Local Park Renovation',
    'Public Transportation Issues',
    'Waste Management Improvement',
    'Street Lighting Deficiency',
  ];

  const popularTopics = [
    'Urban Development',
    'Environmental Protection',
    'Infrastructure',
    'Social Equity',
    'Public Safety',
  ];

  const generateSlug = (text: string) => {
    return `/Concerns/${encodeURIComponent(text.toLowerCase().replace(/\s/g, '-'))}`;
  };

  return (
    <div className="">
      <div className="bg-white rounded-md mb-6">
        <h3 className="font-bold text-base mb-4 text-black text-left uppercase">Trending Concerns</h3>
        <ul className="space-y-2">
          {trendingConcerns.map((concern, index) => (
            <li key={index}>
              <a
                href={generateSlug(concern)}
                className="block text-gray-700 text-sm text-left py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              >
                {index + 1}. {concern}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-md p-4">
        <h3 className="font-bold text-base mb-4 text-black text-left uppercase">Popular Topics</h3>
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