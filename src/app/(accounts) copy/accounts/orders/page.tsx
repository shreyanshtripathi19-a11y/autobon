import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import React from "react";
import NullDataInfo from "../_components/nullDataInfo";

const AccountOrders = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/accounts/dashboard",
    },
    {
      label: "My Orders",
      href: "/accounts/orders",
    },
  ];

  return (
    <div className="px-6 py-10">
      <BreadcrumbWithCustomSeparator items={breadcrumbs} />
      <div className="my-8 flex flex-col gap-y-8">
        <h3 className="font-semibold text-xl">My Orders</h3>
        <NullDataInfo
          title="You Don’t have any active orders"
          description="Start looking for you next ride"
          buttonLabel="Shop cars"
        />
      </div>
    </div>
  );
};

export default AccountOrders;
