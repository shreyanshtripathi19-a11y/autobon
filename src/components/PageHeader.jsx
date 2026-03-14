import React from "react";

const PageHeader = ({ header, info }) => {
  return (
    <div>
      <h2 className="font-semibold text-lg md:text-2xl">{header}</h2>
      <div className="border my-1.5"></div>
      <p className="font-light text-gray-500 text-sm">
        Last Updated: March 1st 2026
      </p>
      {/* <p className="font-light text-gray-500 text-sm">{info}</p> */}
    </div>
  );
};

export default PageHeader;
