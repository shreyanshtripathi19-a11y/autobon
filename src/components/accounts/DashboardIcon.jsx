import { UserCircle, Car, Truck, Calendar, Bell, Search } from "lucide-react";

const iconClass = "h-6 w-6 text-blue-600";

const DashboardIcon = ({ iconName }) => {
  switch (iconName) {
    case "UserCircle":
      return <UserCircle className={iconClass} />;
    case "Car":
      return <Car className={iconClass} />;
    case "Truck":
      return <Truck className={iconClass} />;
    case "Calendar":
      return <Calendar className={iconClass} />;
    case "Bell":
      return <Bell className={iconClass} />;
    case "Search":
      return <Search className={iconClass} />;
    default:
      return <UserCircle className={iconClass} />;
  }
};

export default DashboardIcon;
