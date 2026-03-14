import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import React from "react";
import NullDataInfo from "../_components/nullDataInfo";

const AccountSearches = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/user-account/accounts/dashboard",
    },
    {
      label: "Saved Searches",
      href: "/user-account/accounts/searches",
    },
  ];

  return (
    <div className="px-6 py-10">
      <BreadcrumbWithCustomSeparator items={breadcrumbs} />
      <div className="my-8 flex flex-col gap-y-8">
        <h3 className="font-semibold text-xl">Saved Searches</h3>
        <NullDataInfo
          title="You Don’t have any active saved searches"
          description="Start looking for you next ride to save search criteria and receive alerts"
          buttonLabel="Shop cars"
        />
      </div>
    </div>
  );
};

export default AccountSearches;
