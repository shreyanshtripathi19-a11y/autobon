import { Car, CarIcon } from "lucide-react";
import React from "react";
import NavigationCard from "./_components/navigationCard";

const AccountDashboard = () => {
  const navigations = [
    {
      title: "Personal Info",
      description: "Edit your personal details and contact info",
      iconName: "UserCircle",
      href: "/accounts/profile",
    },
    {
      title: "My cars",
      description: "Manage offers on cars you’re selling or trading",
      iconName: "Car",
      href: "/accounts/cars",
    },
    {
      title: "My orders",
      description: "View pending orders for cars you’re buying",
      iconName: "Truck",
      href: "/accounts/orders",
    },
    {
      title: "Next steps",
      description: "View your tasks, whether you’re buying or selling",
      iconName: "Calendar",
      href: "/accounts/tasks",
    },
    {
      title: "Notifications",
      description: "Manage notification preferences and how we reach you",
      iconName: "Bell",
      href: "/accounts/notifications",
    },
    {
      title: "Saved searches",
      description: "View your saved car search criteria and latest results",
      iconName: "Search",
      href: "/accounts/searches",
    },
  ];
  return (
    <div className="px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      {navigations.map((navigation) => (
        <NavigationCard
          title={navigation.title}
          description={navigation.description}
          iconName={navigation.iconName}
          href={navigation.href}
          key={navigation.title}
        />
      ))}
    </div>
    </div>
  );
};

export default AccountDashboard;
