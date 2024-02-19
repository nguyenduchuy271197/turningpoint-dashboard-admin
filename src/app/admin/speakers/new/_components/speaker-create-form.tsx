"use client";

import { SpeakerInput } from "@/validators/speaker-validator";
import SpeakerForm from "../../_components/speaker-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSpeakerCreate } from "@/features/speaker/hooks/mutate";

export default function SpeakerCreateForm() {
  const { mutate, isPending, error } = useSpeakerCreate();
  const router = useRouter();

  function handleSpeakerCreate(speaker: SpeakerInput) {
    mutate(speaker, {
      onSuccess: () => {
        router.back();
        toast.success("Successfully added category!");
      },
      onError: (error) => {},
    });
  }

  return (
    <SpeakerForm
      variant="create"
      isMutating={isPending}
      onMutate={handleSpeakerCreate}
    />
  );
}
