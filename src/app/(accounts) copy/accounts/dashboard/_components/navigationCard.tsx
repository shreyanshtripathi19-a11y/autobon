import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Icon from "./icon";
import Link from "next/link";

const NavigationCard = ({
  title,
  description,
  iconName,
  href,
}: {
  title: string;
  description: string;
  iconName: string;
  href: string;
}) => {
  return (
    <Link href={href}>
      <Card className="flex-row-reverse md:flex-col items-center md:items-start">
        <CardHeader className="mr-6 ">
          <Icon iconName={iconName} />
        </CardHeader>
        <CardContent className="font-semibold md:text-2xl text-lg">
          {title}
          <div className="w-full flex justify-between items-center font-normal my-2">
            <CardDescription>{description}</CardDescription>
            <CardDescription className="hidden md:block">
              <ArrowRight />
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default NavigationCard;
