import { RegisterInput } from "@/validators/register-validator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useRegisterUpdate({ id }: { id: number }) {
  return useMutation({
    mutationFn: (register: RegisterInput) =>
      axios.put(`/api/registers/${id}`, register),
  });
}

export function useRegisterCreate() {
  return useMutation({
    mutationFn: (register: RegisterInput) =>
      axios.post("/api/registers", register),
  });
}

export function useRegisterDelete({ id }: { id: number }) {
  return useMutation({
    mutationFn: () => axios.delete(`/api/registers/${id}`),
  });
}
