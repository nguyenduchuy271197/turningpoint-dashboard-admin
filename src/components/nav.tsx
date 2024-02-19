"use client";

import NavLink, { INavLink } from "./nav-link";

interface NavProps {
  isCollapsed: boolean;
  links: INavLink[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-6 data-[collapsed=true]:py-6"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <NavLink key={index} link={link} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </div>
  );
}
