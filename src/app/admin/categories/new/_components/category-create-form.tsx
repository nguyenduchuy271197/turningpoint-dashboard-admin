"use client";

import { CategoryInput } from "@/validators/category-validator";
import { toast } from "sonner";
import CategoryForm from "../../_components/category-form";
import { useCategoryCreate } from "@/features/category/hooks/mutate";
import { useRouter } from "next/navigation";

export default function CategoryCreateForm() {
  const { mutate, isPending, error } = useCategoryCreate();
  const router = useRouter();

  function handleCategoryCreate(category: CategoryInput) {
    mutate(category, {
      onSuccess: () => {
        router.back();
        toast.success("Successfully added category!");
      },
      onError: (error) => {},
    });
  }

  return (
    <CategoryForm
      variant="create"
      isMutating={isPending}
      onMutate={handleCategoryCreate}
    />
  );
}
