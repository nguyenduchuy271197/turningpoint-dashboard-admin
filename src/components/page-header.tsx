import { ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode }) {
  return <header className="py-4">{children}</header>;
}

export function PageHeading({ children }: { children: ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

export function PageDescription({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>;
}
