import React from "react";

const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Vehicles Available" },
    { value: "1,000+", label: "Satisfied Canadians" },
    { value: "1,000+", label: "5 Star Reviews" },
  ];

  return (
    <section className="bg-primary py-6 lg:py-8">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="text-[28px] lg:text-[42px] font-black text-white leading-none block">
                {stat.value}
              </span>
              <span className="text-white/80 text-[12px] lg:text-[14px] font-medium mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
