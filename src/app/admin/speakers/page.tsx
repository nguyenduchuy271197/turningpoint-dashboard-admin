import {
  PageDescription,
  PageHeader,
  PageHeading,
} from "@/components/page-header";
import SpeakerList from "./_components/speaker-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function SpeakersPage() {
  return (
    <div className="px-4">
      <div className="flex items-center gap-8 justify-between">
        <PageHeader>
          <PageHeading>Speakers</PageHeading>
          <PageDescription>Lorem ipsum dolor sit amet.</PageDescription>
        </PageHeader>

        <div>
          <Button asChild>
            <Link href="/admin/speakers/new">
              New Speaker
              <Plus className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
      <SpeakerList />
    </div>
  );
}
