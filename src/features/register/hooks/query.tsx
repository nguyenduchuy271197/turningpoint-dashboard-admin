import { Register } from "@/validators/register-validator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useRegisters() {
  return useQuery({
    queryKey: ["registers"],
    queryFn: () => axios.get<Register[]>("/api/registers"),
    select: (res) => res.data,
  });
}

export function useRegister({ id }: { id: number }) {
  return useQuery({
    queryKey: ["registers", id],
    queryFn: () => axios.get<Register>(`/api/registers/${id}`),
    select: (res) => res.data,
    enabled: !!id,
  });
}
