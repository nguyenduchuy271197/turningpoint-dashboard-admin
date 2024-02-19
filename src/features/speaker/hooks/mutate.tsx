import { SpeakerInput } from "@/validators/speaker-validator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useSpeakerUpdate({ id }: { id: number }) {
  return useMutation({
    mutationFn: (speaker: SpeakerInput) =>
      axios.put(`/api/speakers/${id}`, speaker),
  });
}

export function useSpeakerCreate() {
  return useMutation({
    mutationFn: (speaker: SpeakerInput) => axios.post("/api/speakers", speaker),
  });
}

export function useSpeakerDelete({ id }: { id: number }) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/speakers/${id}`),
  });
}
