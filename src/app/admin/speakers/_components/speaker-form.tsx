"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Trash, UploadCloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Speaker,
  SpeakerCreateSchema,
  SpeakerInput,
  speakerCreateSchema,
} from "@/validators/speaker-validator";
import { GENDER_OPTIONS, PLACEHOLDER_AVATAR_URL } from "@/constants";
import { useCategories } from "@/features/category/hooks/query";
import Image from "next/image";
import SpeakerDeleteBtn from "./speaker-delete-btn";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

export default function SpeakerForm({
  initialValues,
  variant,
  isMutating,
  onMutate,
}: {
  initialValues?: Speaker;
  variant: "create" | "update";
  isMutating: boolean;
  onMutate: (speaker: SpeakerInput) => void;
}) {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const form = useForm<SpeakerCreateSchema>({
    resolver: zodResolver(speakerCreateSchema),
    defaultValues: {
      ...initialValues,
      categoryId: initialValues?.categoryId.toString(),
    } || {
      firstName: "",
      lastName: "",
      jobTitle: "",
    },
  });

  const { data: categories, isLoading: isCategoriesFetching } = useCategories();

  async function onSubmit(values: SpeakerCreateSchema) {
    let avatarUrl;
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress: number) => {
            console.log(progress);
          },
        });
        avatarUrl = res.url;
      }
    } catch (error) {
      console.log("Error uploading!");
    }
    onMutate({
      ...values,
      avatarUrl: avatarUrl,
      categoryId: +values.categoryId,
    });
  }

  const isSubmitting = form.formState.isLoading || isMutating;

  const avatarUrl = file
    ? URL.createObjectURL(file)
    : initialValues?.avatarUrl
    ? initialValues.avatarUrl
    : PLACEHOLDER_AVATAR_URL;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-[220px_1fr] gap-y-8 gap-x-16">
          <div className="pt-2">
            <div className="space-y-2 flex flex-col items-center mx-auto max-w-[200px]">
              <Image
                src={avatarUrl}
                alt=""
                height={150}
                width={150}
                className="w-full aspect-square rounded-md object-cover"
              />

              <div className="space-y-2">
                <Label
                  htmlFor="speaker-avatar"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full cursor-pointer"
                  )}
                >
                  <UploadCloud className="size-4 mr-2" />
                  Upload avatar
                </Label>
                <Input
                  id="speaker-avatar"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  type="button"
                >
                  <Trash className="size-4 mr-2" />
                  Remove avatar
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Huy"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Front-end Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENDER_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
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
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.title}
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
                className="w-full sm:w-auto"
              >
                {isSubmitting && <Loader2 className="mr-2 size-4" />}
                {variant === "create" ? "Create Profile" : "Save Profile"}
              </Button>
              {variant === "update" && initialValues?.id && (
                <SpeakerDeleteBtn id={initialValues.id}>
                  <Button type="button" variant="destructive">
                    <Trash className="mr-2 size-4" />
                    Delete
                  </Button>
                </SpeakerDeleteBtn>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
