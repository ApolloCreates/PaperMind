import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import type { Paper } from "@/types/paper";

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium break-words">
        {value}
      </p>
    </div>
  );
}

export function PaperDetailsSheet({
  paper,
  open,
  onOpenChange,
}: {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!paper) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            Paper Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">

          <Field
            label="Title"
            value={
              paper.title ??
              "Unknown"
            }
          />

          <Field
            label="Filename"
            value={paper.original_filename}
          />

          <Field
            label="Authors"
            value={
              paper.authors?.join(", ") ??
              "Unknown"
            }
          />

          <Field
            label="Pages"
            value={paper.page_count.toString()}
          />

          <Field
            label="Created"
            value={new Date(
              paper.created_at
            ).toLocaleString()}
          />

          <Field
            label="Updated"
            value={new Date(
              paper.updated_at
            ).toLocaleString()}
          />

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <Badge className="mt-2 capitalize">
              {paper.status}
            </Badge>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}