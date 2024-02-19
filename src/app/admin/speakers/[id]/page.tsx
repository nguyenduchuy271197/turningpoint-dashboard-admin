import { PageHeader, PageHeading } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import SpeakerUpdateForm from "./_components/speaker-update-form";

export default function SpeakerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

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
        <PageHeading>Profile Setting</PageHeading>
      </PageHeader>
      <SpeakerUpdateForm id={id} />
    </div>
  );
}
