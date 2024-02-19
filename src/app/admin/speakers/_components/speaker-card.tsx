"use client";

import { Button } from "@/components/ui/button";
import { GENDET_TITLES, PLACEHOLDER_AVATAR_URL } from "@/constants";
import { useCategoryById } from "@/features/category/hooks/query";
import { Speaker } from "@/validators/speaker-validator";
import { Mail, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SpeakerCard({
  id,
  firstName,
  lastName,
  avatarUrl,
  jobTitle,
  gender,
  categoryId,
}: Speaker) {
  const { data, isLoading, error } = useCategoryById({ id: categoryId });

  if (error) return <div>{error.message}</div>;

  if (isLoading || !data) return null;

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <Image
        className="w-full h-56 object-cover object-center"
        src={avatarUrl || PLACEHOLDER_AVATAR_URL}
        width={100}
        height={150}
        alt="avatar"
      />
      <div className="flex items-center px-4 py-2 bg-primary text-primary-foreground">
        <Sparkle className="size-4" />
        <h3 className="mx-2 text-primary-foreground font-medium">
          {data.title}
        </h3>
      </div>
      <div className="py-4 px-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {GENDET_TITLES[gender]} {firstName} {lastName}
        </h1>
        <p className="text-primary/70 mb-2">{jobTitle}</p>
        <Button variant="outline" asChild>
          <Link href={`/admin/speakers/${id}`} className="w-full">
            View Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
