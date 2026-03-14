import Featured from "@/pages/ProtectionPlan/Featured";
import PersonalizedProtection from "@/pages/ProtectionPlan/PersonalizedProtection";
import React from "react";

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <PersonalizedProtection />
      <div className="w-full flex justify-center items-center max-w-[1200px] mx-auto">
        <Featured />
      </div>
    </div>
  );
};

export default page;
