import { UserNav } from "./user-nav";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Header({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 border-b", className)} {...props}>
      <div className="flex items-center justify-end h-header">
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
