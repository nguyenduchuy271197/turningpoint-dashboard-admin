import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
import { useCourseDelete } from "@/features/course/hooks/mutate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function CourseDeleteBtn({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { mutate, isPending } = useCourseDelete({ slug });
  const router = useRouter();

  const disabled = isPending;

  function handleCourseDelete() {
    mutate(undefined, {
      onSuccess: () => {
        router.back();
        toast.success("Successfully deleted course!");
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
            onClick={handleCourseDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
