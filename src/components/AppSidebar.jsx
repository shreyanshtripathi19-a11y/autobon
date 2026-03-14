"use client";

import * as React from "react";
import {
  LogOut,
  User,
  List,
  MessageSquare,
  Map,
  BarChart2,
  FileText,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  Settings,
  MessageSquareText,
  TrendingUp,
  PieChart,
  Boxes,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { TeamSwitcher } from "./team-switcher";
import Link from "next/link";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: PieChart },
  { name: "User Management", href: "/admin/user-management", icon: User },
  {
    name: "Listings Management",
    href: "/admin/listings-management",
    icon: BarChart2,
  },
  {
    name: "Inquiry/Messages",
    href: "/admin/inquiry-messages",
    icon: MessageSquare,
  },
  {
    name: "Location/Market Control",
    href: "/admin/location-market-control",
    icon: Map,
  },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  {
    name: "Content Management",
    href: "/admin/content-management",
    icon: MessageSquareText,
  },
  { name: "Admin Settings", href: "/admin/settings", icon: Settings },
];

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" className="bg-blue-600 text-white" {...props}>
      <SidebarHeader className="bg-blue-600 text-white">
        <TeamSwitcher
          teams={[
            {
              name: "Autobon",
              logo: GalleryVerticalEnd,
              plan: "Enterprise",
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent className="bg-blue-600 text-white">
        <NavMain items={navigation} />
      </SidebarContent>
      <SidebarFooter className="bg-blue-600 text-white">
        <Link href="/auth/login" className="mb-6 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-blue-300 hover:text-gray-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
