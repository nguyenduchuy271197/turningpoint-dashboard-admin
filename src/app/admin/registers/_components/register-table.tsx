"use client";

import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { useRegisters } from "@/features/register/hooks/query";

export default function RegisterTable() {
  const { isLoading, data, error } = useRegisters();

  if (error) return <div className="text-destructive">{error.message}</div>;

  if (isLoading || !data) return <div>Loading...</div>;

  return <DataTable data={data} columns={columns} />;
}
