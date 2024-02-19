import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseCreateForm from "./_components/course-create-form";

export default function ClassCreatePage() {
  return (
    <div className="px-4 py-4">
      <Link
        href="/admin/courses"
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <MoveLeft className="mr-2 size-4" />
        Back to classes
      </Link>
      <PageHeader>
        <PageHeading>Create New Class</PageHeading>
      </PageHeader>
      <CourseCreateForm />
    </div>
  );
}
