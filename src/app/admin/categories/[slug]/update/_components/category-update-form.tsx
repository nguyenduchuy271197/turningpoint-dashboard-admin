"use client";

import { CategoryInput } from "@/validators/category-validator";
import CategoryForm from "../../../_components/category-form";
import { toast } from "sonner";
import { useCategoryUpdate } from "@/features/category/hooks/mutate";
import { useCategory } from "@/features/category/hooks/query";

export default function CategoryUpdateForm({ slug }: { slug: string }) {
  const { isLoading, data } = useCategory({ slug });

  const { mutate, isPending } = useCategoryUpdate({ slug });

  function handleCategoryUpdate(category: CategoryInput) {
    mutate(category, {
      onSuccess: () => {
        toast.success("Successfully updated category!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <CategoryForm
      initialValues={data}
      variant="update"
      isMutating={isPending}
      onMutate={handleCategoryUpdate}
    />
  );
}
