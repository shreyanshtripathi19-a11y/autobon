import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import React from "react";

const ActionInfo = ({
  title,
  description,
  label,
  status,
  onStatusChange,
}: {
  title: string;
  description: string;
  label: string;
  status: boolean;
  onStatusChange: (checked: boolean) => void;
}) => {
  return (
    <Card className="md:p-6 p-4 h-full justify-evenly">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="font-semibold flex gap-x-3 justify-between items-center">
        {label} <Switch checked={status} onCheckedChange={onStatusChange} />
      </div>
    </Card>
  );
};

export default ActionInfo;
