import { PageHeader, PageHeading } from "@/components/page-header";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import CategoryUpdateForm from "./_components/category-update-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function CategoryUpdatePage({
  params,
}: {
  params: { slug: string };
}) {
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
        <PageHeading>Update Category</PageHeading>
      </PageHeader>
      <CategoryUpdateForm slug={params.slug} />
    </div>
  );
}
