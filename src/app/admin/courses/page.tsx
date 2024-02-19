import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import CourseTable from "./_components/course-table";

export default async function CoursesPage() {
  return (
    <div className="px-4">
      <div className="flex items-center gap-8 justify-between">
        <PageHeader>
          <PageHeading>Courses</PageHeading>
          <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
        </PageHeader>

        <div>
          <Button asChild>
            <Link href="/admin/courses/new">
              New Course
              <Plus className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <CourseTable />
    </div>
  );
}
