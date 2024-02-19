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
  Category,
  CategoryCreateSchema,
  CategoryInput,
  categoryCreateSchema,
} from "@/validators/category-validator";
import CategoryDeleteBtn from "./category-delete-btn";

export default function CategoryForm({
  initialValues,
  variant,
  isMutating,
  onMutate,
}: {
  initialValues?: Category;
  variant: "create" | "update";
  isMutating: boolean;
  onMutate: (category: CategoryInput) => void;
}) {
  const form = useForm<CategoryCreateSchema>({
    resolver: zodResolver(categoryCreateSchema),
    defaultValues: initialValues || {
      title: "",
      slug: "",
      description: "",
    },
  });

  function onSubmit(values: CategoryCreateSchema) {
    onMutate(values);
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
                    placeholder="Ngôn ngữ"
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
            <CategoryDeleteBtn slug={initialValues.slug}>
              <Button type="button" variant="destructive">
                <Trash className="mr-2 size-4" />
                Delete
              </Button>
            </CategoryDeleteBtn>
          )}
        </div>
      </form>
    </Form>
  );
}
