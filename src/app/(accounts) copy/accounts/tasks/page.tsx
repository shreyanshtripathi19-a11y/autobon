import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumblist";
import React from "react";
import NullDataInfo from "../_components/nullDataInfo";

const AccountTasks = () => {
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/accounts/dashboard",
    },
    {
      label: "Next Tasks",
      href: "/accounts/tasks",
    },
  ];

  return (
    <div className="px-6 py-10">
      <BreadcrumbWithCustomSeparator items={breadcrumbs} />
      <div className="my-8 flex flex-col gap-y-8">
        <h3 className="font-semibold text-xl">Next Steps</h3>
        <NullDataInfo description="You don’t have any outstanding tasks" />
      </div>
    </div>
  );
};

export default AccountTasks;
