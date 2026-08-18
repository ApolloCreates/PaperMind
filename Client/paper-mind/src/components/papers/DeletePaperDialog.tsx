import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeletePaper } from "@/hooks/usePapers";

import type { Paper } from "@/types/paper";

export function DeletePaperDialog({
  paper,
  onOpenChange,
}: {
  paper: Paper | null;
  onOpenChange: (open: boolean) => void;
}) {
  const mutation = useDeletePaper(
    paper?.project_id ?? ""
  );

  async function handleDelete() {
    if (!paper) return;

    try {
      await mutation.mutateAsync(
        paper.id
      );

      toast.success(
        "Paper deleted successfully."
      );

      onOpenChange(false);
    } catch (e) {
      toast.error(
        "Failed to delete paper."
      );
    }
  }

  return (
    <AlertDialog
      open={!!paper}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            Delete Paper

          </AlertDialogTitle>

          <AlertDialogDescription>

            Are you sure you want to delete{" "}
            <strong>

              {paper?.title ??
                paper?.original_filename}

            </strong>

            ?

            <br />

            This action cannot be undone.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>

            Cancel

          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={mutation.isPending}
          >

            {mutation.isPending && (

              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            )}

            Delete

          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}