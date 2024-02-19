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
import { useCategoryDelete } from "@/features/category/hooks/mutate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function CategoryDeleteBtn({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const { mutate, isPending } = useCategoryDelete({ slug });
  const router = useRouter();

  const disabled = isPending;

  function handleCategoryDelete() {
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
            onClick={handleCategoryDelete}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
