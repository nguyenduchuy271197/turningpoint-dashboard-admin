import { CategoryInput } from "@/validators/category-validator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCategoryUpdate({ slug }: { slug: string }) {
  return useMutation({
    mutationFn: (category: CategoryInput) =>
      axios.put(`/api/categories/${slug}`, category),
  });
}

export function useCategoryCreate() {
  return useMutation({
    mutationFn: (category: CategoryInput) =>
      axios.post("/api/categories", category),
  });
}

export function useCategoryDelete({ slug }: { slug: string }) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/categories/${slug}`),
  });
}
