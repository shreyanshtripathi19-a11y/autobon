import { ArrowRight } from "lucide-react";
import DashboardIcon from "./DashboardIcon";
import Link from "next/link";

const NavigationCard = ({ title, description, iconName, href }) => {
  return (
    <Link href={href} className="group">
      <div className="flex flex-col justify-between h-full rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
        {/* Icon */}
        <div className="mb-6">
          <DashboardIcon iconName={iconName} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Description + Arrow */}
        <div className="flex items-end justify-between gap-3">
          <p className="text-sm text-gray-500 leading-snug">{description}</p>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
