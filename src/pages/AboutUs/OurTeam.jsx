import React from "react";

const OurTeam = () => {
  const leaders = [1, 2];
  const boardMembers = [1, 2, 3, 4];

  return (
    <section className="bg-[#4079ED] py-20 px-6 text-white font-sans">
      <div className="max-w-[1000px] mx-auto">
        {/* Section 1: Our Leaders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-12">Our Leaders</h2>
            {/* Reduced gap from 8 to 4 and added text below images */}
            <div className="flex gap-4">
              {leaders.map((item) => (
                <div key={item} className="text-center">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-300 rounded-full border-4 border-white/20 shadow-lg overflow-hidden mb-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=leader${item}`}
                      alt="Leader"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-sm">Person name</p>
                  <p className="text-xs opacity-70">Person Details</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:pt-16">
            <h3 className="text-lg font-semibold mb-2">Meet the team</h3>
            <p className="text-sm opacity-90 leading-loose max-w-md">
              We're a diverse group of thinkers and doers united by our shared
              vision. We believe that great work always comes from great
              culture.
            </p>
          </div>
        </div>

        <hr className="border-white/70 mb-16" />

        {/* Section 2: Board of Directors */}
        <div className="flex justify-start  gap-12 items-start flex-col">
          <h2 className="text-2xl font-bold">Board of Directors</h2>
          {/* Changed to 4 columns on desktop and ensured items are centered */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-y-12 gap-x-4 justify-items-center">
            {boardMembers.map((item) => (
              <div key={item} className="text-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-full border-4 border-white/20 shadow-lg mb-4 overflow-hidden mx-auto">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=board${item}`}
                    alt="Board member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-sm">Person name</p>
                <p className="text-xs opacity-70">Person Details</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
