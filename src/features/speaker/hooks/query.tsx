import { Speaker } from "@/validators/speaker-validator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSpeakers() {
  return useQuery({
    queryKey: ["speakers"],
    queryFn: () => axios.get<Speaker[]>("/api/speakers"),
    select: (res) => res.data,
  });
}

export function useSpeaker({ id }: { id: number }) {
  return useQuery({
    queryKey: ["speakers", id],
    queryFn: () => axios.get<Speaker>(`/api/speakers/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });
}
