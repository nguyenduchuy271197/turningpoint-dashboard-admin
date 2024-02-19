import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import CategoryList from "./_components/category-list";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="px-4">
      <PageHeader>
        <PageHeading>Categories</PageHeading>
        <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
      </PageHeader>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        <Link
          href="/admin/categories/new"
          className="h-full w-full bg-primary text-primary-foreground rounded-md aspect-square grid place-items-center hover:bg-primary/95 transition-colors"
        >
          <Plus className="size-12" />
        </Link>
        <CategoryList />
      </div>
    </div>
  );
}
