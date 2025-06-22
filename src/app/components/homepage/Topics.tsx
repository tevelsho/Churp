'use client';
import Image from 'next/image';
import Link from 'next/link';

const Topics = () => {
  const topicCards = [
    {
      id: 1,
      title: "Noise Until Midnight, Cannot Sleep",
      subtitle: "Noise Complaints",
      imageSrc: "/assets/images/placeholder.png",
      backgroundColor: "bg-indigo-100", 
      href: "/topics/noise-complaints"
    },
    {
      id: 2,
      title: "My Lift Always Spoil One",
      subtitle: "Lift Breakdowns",
      imageSrc: "/assets/images/placeholder.png",
      backgroundColor: "bg-sky-100", 
      href: "/topics/lift-issues"
    },
    {
      id: 3,
      title: "This Area Always Flood When Rain",
      subtitle: "Drainage & Flooding",
      imageSrc: "/assets/images/placeholder.png",
      backgroundColor: "bg-emerald-100",
      href: "/topics/drainage-flood"
    }
  ];

  return (
    <section className="w-screen bg-blue-50/70">
      <div className="max-w-screen-2xl mx-auto w-full">
        {/* Header */}
        <h2 className="text-[#2C2E34] text-3xl md:text-4xl font-semibold text-center mb-12">
          Hot topics people are talking about
        </h2>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          {topicCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group block w-80 rounded-2xl overflow-hidden transition-transform duration-200 group-hover:scale-105 group-hover:shadow-lg"
            >
              <div className={`${card.backgroundColor} flex flex-col h-full`}>
                {/* Full-width image */}
                <div className="relative w-full h-40">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>

                {/* Text Content */}
                <div className="p-6 text-left flex flex-col flex-grow">
                  <h3 className="text-[#2C2E34] text-lg font-semibold mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[#454953] text-sm">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topics;
