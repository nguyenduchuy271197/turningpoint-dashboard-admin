import { PageHeader, PageHeading } from "@/components/page-header";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import SpeakerCreateForm from "./_components/speaker-create-form";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function SpeakerCreatePage() {
  return (
    <div className="px-4 py-4">
      <Link
        href="/admin/speakers"
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        <MoveLeft className="mr-2 size-4" />
        Back to speakers
      </Link>
      <PageHeader>
        <PageHeading>Create New Speaker</PageHeading>
      </PageHeader>
      <SpeakerCreateForm />
    </div>
  );
}
