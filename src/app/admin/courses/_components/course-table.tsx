"use client";

import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { useCourses } from "@/features/course/hooks/query";

export default function CourseTable() {
  const { isLoading, data, error } = useCourses();

  if (error) return <div className="text-destructive">{error.message}</div>;

  if (isLoading || !data) return <div>Loading...</div>;

  return <DataTable data={data} columns={columns} />;
}
