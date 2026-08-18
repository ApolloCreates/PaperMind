import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";

import { useCreateDraft } from "@/hooks/useCreateDraft";


export function CreateDraftDialog({
  open,
  onOpenChange,
  projectId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
}) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const createDraftMutation = useCreateDraft();
  const handleCreate = async () => {
    const draft = await createDraftMutation.mutateAsync({
      project_id: projectId,
      title,
      topic,
    });

    onOpenChange(false);

    navigate({
      to: "/workspace/$projectId/drafts/$draftId",
      params: {
        projectId,
        draftId: draft.id,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create New Draft
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Paper title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Research topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreate}
            disabled={createDraftMutation.isPending}
          >
            {createDraftMutation.isPending
              ? "Creating..."
              : "Create Draft"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}