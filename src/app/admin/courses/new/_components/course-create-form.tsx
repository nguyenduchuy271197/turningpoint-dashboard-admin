"use client";

import { CourseInput } from "@/validators/course-validator";
import { toast } from "sonner";
import CourseForm from "../../_components/course-form";
import { useCourseCreate } from "@/features/course/hooks/mutate";
import { useRouter } from "next/navigation";

export default function CourseCreateForm() {
  const { mutate, isPending, error } = useCourseCreate();
  const router = useRouter();

  function handleCourseCreate(course: CourseInput) {
    mutate(course, {
      onSuccess: () => {
        router.back();
        toast.success("Successfully added course!");
      },
      onError: (error) => {},
    });
  }

  return (
    <CourseForm
      variant="create"
      isMutating={isPending}
      onMutate={handleCourseCreate}
    />
  );
}
