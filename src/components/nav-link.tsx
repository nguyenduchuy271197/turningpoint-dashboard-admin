"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export interface INavLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  routes: string[];
}

interface NavLinkProps {
  isCollapsed: boolean;
  link: INavLink;
}

export default function NavLink({ link, isCollapsed }: NavLinkProps) {
  const pathname = usePathname();
  const variant =
    pathname.slice(1).split("/")[1] === link.routes[1] ? "default" : "ghost";
  const href = link.routes.reduce((link, route) => link + "/" + route, "");

  return isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: variant, size: "icon" }),
            "h-9 w-9",
            variant === "default" &&
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <link.icon className="h-4 w-4" />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {link.title}
        {link.label && (
          <span className="ml-auto text-muted-foreground">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant, size: "sm" }),
        variant === "default" &&
          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      {link.title}
      {link.label && (
        <span
          className={cn(
            "ml-auto",
            variant === "default" && "text-background dark:text-white"
          )}
        >
          {link.label}
        </span>
      )}
    </Link>
  );
}
