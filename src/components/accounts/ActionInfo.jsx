import { Switch } from "@/components/ui/switch";

const ActionInfo = ({ title, description, label, status, onStatusChange }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 h-full flex flex-col justify-between gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h4 className="font-semibold text-[15px] md:text-base text-gray-900 leading-snug">
          {title}
        </h4>
        <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="font-semibold text-[13px] md:text-sm text-gray-900">
          {label}
        </span>
        <Switch checked={status} onCheckedChange={onStatusChange} />
      </div>
    </div>
  );
};

export default ActionInfo;
