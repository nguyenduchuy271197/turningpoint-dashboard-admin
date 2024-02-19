"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { useEffect } from "react";
import { Loader2, Trash } from "lucide-react";
import {
  Course,
  CourseCreateSchema,
  CourseInput,
  courseCreateSchema,
} from "@/validators/course-validator";
import CourseDeleteBtn from "./course-delete-btn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/category/hooks/query";
import { useSpeakers } from "@/features/speaker/hooks/query";

export default function CourseForm({
  initialValues,
  variant,
  isMutating,
  onMutate,
}: {
  initialValues?: Course;
  variant: "create" | "update";
  isMutating: boolean;
  onMutate: (course: CourseInput) => void;
}) {
  const form = useForm<CourseCreateSchema>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      ...initialValues,
      categoryId: initialValues?.categoryId.toString(),
      speakerId: initialValues?.speakerId.toString(),
    } || {
      title: "",
      slug: "",
      description: "",
    },
  });

  const { data: categories, isLoading: isCategoriesFetching } = useCategories();

  const { data: speakers, isLoading: isSpeakersFetching } = useSpeakers();

  function onSubmit(values: CourseCreateSchema) {
    onMutate({
      ...values,
      categoryId: +values.categoryId,
      speakerId: +values.speakerId,
    });
  }

  const title = form.watch("title");
  const isSubmitting = form.formState.isLoading || isMutating;

  useEffect(() => {
    form.setValue("slug", slugify(title, { lower: true }));
  }, [form, title]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid sm:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Master tiếng Nhật với Bí kíp thiên phú KotoOnsei"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write something..."
                    className="resize-none"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c} value={c.id.toString()}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="speakerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Speaker</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Speaker" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {speakers?.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.firstName} {s.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            disabled={!form.formState.isDirty || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 size-4" />}
            {variant === "create" ? "Create" : "Save"}
          </Button>
          {variant === "update" && initialValues?.slug && (
            <CourseDeleteBtn slug={initialValues.slug}>
              <Button type="button" variant="destructive">
                <Trash className="mr-2 size-4" />
                Delete
              </Button>
            </CourseDeleteBtn>
          )}
        </div>
      </form>
    </Form>
  );
}
