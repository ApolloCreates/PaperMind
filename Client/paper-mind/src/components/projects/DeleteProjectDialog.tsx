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

import { useDeleteProject } from "@/hooks/useProjects";

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  projectName: string;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  projectId,
  projectName,
}: DeleteProjectDialogProps) {
  const deleteProject = useDeleteProject();

  async function handleDelete() {
    try {
      await deleteProject.mutateAsync(projectId);

      toast.success(`${projectName} deleted successfully.`);

      onOpenChange(false);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to delete project."
      );
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Project?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {projectName}
            </span>
            ?
            <br />
            <br />
            This action cannot be undone.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            disabled={deleteProject.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteProject.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {deleteProject.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Delete

          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}