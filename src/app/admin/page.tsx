import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import StatCard from "./_components/stat-card";
import { DollarSign } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="px-4">
      <PageHeader>
        <PageHeading>Dashboard</PageHeading>
        <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
      </PageHeader>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Total Revenue" value={45231.89} icon={DollarSign} />
        <StatCard label="Total Revenue" value={45231.89} icon={DollarSign} />
        <StatCard label="Total Revenue" value={45231.89} icon={DollarSign} />
        <StatCard label="Total Revenue" value={45231.89} icon={DollarSign} />
      </div>
    </div>
  );
}
