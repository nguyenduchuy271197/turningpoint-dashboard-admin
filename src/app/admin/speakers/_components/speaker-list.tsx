"use client";

import { useSpeakers } from "@/features/speaker/hooks/query";
import SpeakerCard from "./speaker-card";

export default function SpeakerList() {
  const { data, isLoading, error } = useSpeakers();

  if (error) return <div className="text-destructive">{error.message}</div>;

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((speaker) => (
        <SpeakerCard key={speaker.id} {...speaker} />
      ))}
    </div>
  );
}
