import React from "react";

const StatsSection = () => {
  const stats = [
    { label: "Cars sold annually", value: "10,000+" },
    { label: "On Google reviews", value: "4.7 stars" },
    { label: "Trees planted", value: "5000+" },
  ];

  return (
    <section className="bg-[#E2E2E2] py-20 px-6">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#0F0202] mb-16">
          Autobon Numbers
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-5xl font-black font-semibold text-[#4079ED] mb-2">
                {stat.value}
              </span>
              <span className="text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
