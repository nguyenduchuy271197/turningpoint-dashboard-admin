import { PageHeader, PageHeading } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import CategoryCreateForm from "./_components/category-create-form";

export default function CategoryCreatePage() {
  return (
    <div className="px-4 py-4">
      <Link
        href="/admin/categories"
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <MoveLeft className="mr-2 size-4" />
        Back to categories
      </Link>
      <PageHeader>
        <PageHeading>Create New Category</PageHeading>
      </PageHeader>
      <CategoryCreateForm />
    </div>
  );
}
