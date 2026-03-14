import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import React from "react";
import NullDataInfo from "../_components/nullDataInfo";

const AccountCars = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/user-account/accounts/dashboard",
    },
    {
      label: "My Cars",
      href: "/user-account/accounts/cars",
    },
  ];

  return (
    <div className="px-6 py-10">
      <BreadcrumbWithCustomSeparator items={breadcrumbs} />
      <div className="my-8 flex flex-col gap-y-8">
        <h3 className="font-semibold text-xl">My Cars</h3>
        <NullDataInfo
          title="You Don’t have any active offers"
          description="Share some info about your car and get a firm offer in minutes"
          buttonLabel="Sell or trade my car"
          href="/user-account/accounts/cars/trade"
        />
      </div>
    </div>
  );
};

export default AccountCars;
