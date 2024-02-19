"use client";
import { useSpeaker } from "@/features/speaker/hooks/query";
import SpeakerForm from "../../_components/speaker-form";
import { useSpeakerUpdate } from "@/features/speaker/hooks/mutate";
import { SpeakerInput } from "@/validators/speaker-validator";
import { toast } from "sonner";

export default function SpeakerUpdateForm({ id }: { id: number }) {
  const { isLoading, data } = useSpeaker({ id });

  const { mutate, isPending } = useSpeakerUpdate({ id });

  function handleSpeakerUpdate(speaker: SpeakerInput) {
    mutate(speaker, {
      onSuccess: () => {
        toast.success("Successfully updated speaker!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <SpeakerForm
      initialValues={data}
      variant="update"
      isMutating={isPending}
      onMutate={handleSpeakerUpdate}
    />
  );
}
