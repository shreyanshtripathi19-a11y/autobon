import { UserCircle, Car, Truck, Calendar, Bell, Search } from "lucide-react";

const Icon = ({ iconName }: { iconName: string }) => {
  switch (iconName) {
    case "UserCircle":
      return <UserCircle className="text-blue-600" />;
    case "Car":
      return <Car className="text-blue-600" />;
    case "Truck":
      return <Truck className="text-blue-600" />;
    case "Calendar":
      return <Calendar className="text-blue-600" />;
    case "Bell":
      return <Bell className="text-blue-600" />;
    case "Search":
      return <Search className="text-blue-600" />;
    default:
      return <UserCircle className="text-blue-600" />;
  }
};

export default Icon;
