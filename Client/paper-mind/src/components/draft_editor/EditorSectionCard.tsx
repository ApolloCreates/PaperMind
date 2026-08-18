import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MoreHorizontal,
  GripVertical,
  Loader2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import type { SectionDef } from "./sections";
import { generatePaperSection } from "@/services/paperWriter.service";

interface Props {
  draftId: string;
  section: SectionDef;
  index: number;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  active: boolean;
}

export const EditorSectionCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      draftId,
      section,
      index,
      value,
      onChange,
      onFocus,
      active,
    },
    ref,
  ) => {
    const Icon = section.icon;
    const editorRef = useRef<HTMLDivElement>(null);

    const [isGenerating, setIsGenerating] = useState(false);

    const onGenerate = async () => {
      try {
        setIsGenerating(true);

        const response = await generatePaperSection({
          draft_id: draftId,
          section: section.title,
        });

        onChange(response.content);
      } catch (error) {
        console.error("Failed to generate paper section:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    useEffect(() => {
      const el = editorRef.current;

      if (!el) return;
      if (document.activeElement === el) return;

      if (el.innerText !== value) {
        el.innerText = value;
      }
    }, [value]);

    const words = value.trim()
      ? value.trim().split(/\s+/).length
      : 0;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.04,
          duration: 0.25,
        }}
        data-section={section.key}
        className="scroll-mt-24"
      >
        <Card
          className={cn(
            "group rounded-2xl border-border/60 p-6 shadow-sm transition-all sm:p-8",
            active
              ? "ring-1 ring-primary/30"
              : "hover:shadow-md",
          )}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h2>

              <p className="text-xs text-muted-foreground">
                {words} {words === 1 ? "word" : "words"}
              </p>
            </div>

            <Badge
              variant="secondary"
              className="hidden rounded-full font-normal sm:inline-flex"
            >
              Section {index + 1}
            </Badge>

            <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-1.5 text-xs"
                onClick={onGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    AI Draft
                  </>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    Rewrite with AI
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Expand
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Summarize
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    Clear section
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 cursor-grab"
              >
                <GripVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onFocus={onFocus}
            onInput={(e) =>
              onChange(
                (e.target as HTMLDivElement).innerText,
              )
            }
            data-placeholder={section.placeholder}
            className={cn(
              "prose-editor min-h-[160px] rounded-lg px-1 py-2 text-[15px] leading-7 text-foreground outline-none",
              "focus:bg-muted/20",
              "empty:before:pointer-events-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]",
            )}
          />
        </Card>
      </motion.div>
    );
  },
);

EditorSectionCard.displayName = "EditorSectionCard";