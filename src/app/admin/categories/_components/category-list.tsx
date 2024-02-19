"use client";

import { Skeleton } from "@/components/ui/skeleton";
import CategoryCard from "./category-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@prisma/client";
import { useCategories } from "@/features/category/hooks/query";

function CategoryListSkeleton() {
  return (
    <>
      <Skeleton className="aspect-square rounded-md" />;
      <Skeleton className="aspect-square rounded-md" />;
      <Skeleton className="aspect-square rounded-md" />;
    </>
  );
}

export default function CategoryList() {
  const { isLoading, data, error } = useCategories();

  if (isLoading || !data) return <CategoryListSkeleton />;

  return (
    <>
      {data.map((c) => (
        <CategoryCard key={c.id} {...c} />
      ))}
    </>
  );
}
