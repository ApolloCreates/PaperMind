import type { StudioPaper, StudioTool } from "@/types/ai_studio";

type Props = {
  tool: StudioTool;
  papers: StudioPaper[];
};

export function WorkflowHeader({ tool, papers }: Props) {
  return (
    <div className="border-b border-border/60 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
          <span className="text-lg">{tool.emoji}</span>
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight">
            {tool.title}
          </h1>

          <p className="truncate text-sm text-muted-foreground">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
        <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
          Requires: {tool.requiresLabel}
        </span>

        <span>·</span>

        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
          {papers.length} selected
        </span>
      </div>
    </div>
  );
}