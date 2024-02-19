"use client";

import { useMediaQuery } from "usehooks-ts";
import { Nav } from "@/components/nav";
import { cn } from "@/lib/utils";
import {
  ArchiveX,
  File,
  Filter,
  LayoutDashboard,
  User,
  Users,
} from "lucide-react";
import { HTMLAttributes } from "react";
import Logo from "./logo";
import { Separator } from "./ui/separator";

export default function Sidebar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const isLargeScreen = useMediaQuery("(min-width: 1224px)");
  const isCollapsed = !isLargeScreen;

  return (
    <div
      className={cn(
        "border-r max-w-[280px]",
        !isCollapsed && "w-full",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center h-header px-2">
        {!isCollapsed && <Logo />}
      </div>

      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            icon: LayoutDashboard,
            routes: ["admin"],
          },
          {
            title: "Courses",
            label: "9",
            icon: File,
            routes: ["admin", "courses"],
          },
          {
            title: "Categories",
            label: "4",
            icon: Filter,
            routes: ["admin", "categories"],
          },
          {
            title: "Speakers",
            label: "10",
            icon: User,
            routes: ["admin", "speakers"],
          },
          {
            title: "Registers",
            label: "100",
            icon: Users,
            routes: ["admin", "registers"],
          },
          {
            title: "Blogs",
            label: "23",
            icon: ArchiveX,
            routes: ["admin", "blogs"],
          },
        ]}
      />
    </div>
  );
}
