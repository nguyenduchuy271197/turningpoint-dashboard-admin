import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get<Category[]>("/api/categories"),
    select: (res) => res.data,
  });
}

export function useCategory({ slug }: { slug: string }) {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: () => axios.get<Category>(`/api/categories/${slug}`),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useCategoryById({ id }: { id: number }) {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => axios.get<Category>(`/api/categories/id/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });
}
