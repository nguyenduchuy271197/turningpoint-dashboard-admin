import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSpeakerDelete } from "@/features/speaker/hooks/mutate";
export default function SpeakerDeleteBtn({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const { mutate, isPending } = useSpeakerDelete({ id });
  const router = useRouter();

  const disabled = isPending;

  function handleSpeakerDelete() {
    mutate(undefined, {
      onSuccess: () => {
        router.back();
        toast.success("Successfully deleted category!");
      },
      onError: () => {},
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={disabled}
            onClick={handleSpeakerDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
