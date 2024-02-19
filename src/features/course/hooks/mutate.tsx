import { CourseInput } from "@/validators/course-validator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCourseUpdate({ slug }: { slug: string }) {
  return useMutation({
    mutationFn: (course: CourseInput) =>
      axios.put(`/api/courses/${slug}`, course),
  });
}

export function useCourseCreate() {
  return useMutation({
    mutationFn: (course: CourseInput) => axios.post("/api/courses", course),
  });
}

export function useCourseDelete({ slug }: { slug: string }) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/courses/${slug}`),
  });
}
