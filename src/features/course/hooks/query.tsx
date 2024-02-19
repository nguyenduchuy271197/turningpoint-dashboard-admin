import { Course } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => axios.get<Course[]>("/api/courses"),
    select: (res) => res.data,
  });
}

export function useCourse({ slug }: { slug: string }) {
  return useQuery({
    queryKey: ["courses", slug],
    queryFn: () => axios.get<Course>(`/api/courses/${slug}`),
    select: (res) => res.data,
    enabled: !!slug,
  });
}

export function useCourseById({ id }: { id: number }) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => axios.get<Course>(`/api/courses/id/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });
}
