import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useDraftPaper } from "@/hooks/useDraftPaper";
import { DraftHeader } from "./DraftHeader";
import { SectionSidebar } from "./SectionSidebar";
import { SectionNavigation } from "./SectionNavigation";
import { EditorSectionCard } from "./EditorSectionCard";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { PaperStatisticsCard } from "./PaperStatisticsCard";
import { AIToolbar } from "./AIToolbar";
import { SECTIONS, type SectionKey } from "./sections";
import type { SaveStatus } from "./SaveIndicator";
import { parsePaper } from "@/utils/parsePaper";
import { useDebounce } from "use-debounce";
import { usePaperWriter } from "@/hooks/usePaperWriter";
import { buildPaper } from "@/utils/buildPaper";
import { useUpdatePaper } from "@/hooks/useUpdatePaper";

type SectionMap = Record<SectionKey, string>;

const emptySections = (): SectionMap =>
  SECTIONS.reduce((acc, s) => {
    acc[s.key] = "";
    return acc;
  }, {} as SectionMap);

export function DraftEditorPage() {
  const { projectId, draftId } = useParams({
    from: "/workspace/$projectId/drafts/$draftId",
  });

  const {
    data: paper,
    isLoading,
    isError,
  } = useDraftPaper(draftId);

  const [content, setContent] = useState<SectionMap>(emptySections);
  const [debouncedContent] = useDebounce(content, 1500);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState<SectionKey>("abstract");
  const [status, setStatus] = useState<SaveStatus>("saved");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(new Date());
  const updatePaperMutation = useUpdatePaper();

  const BACKEND_SECTION_MAP: Record<SectionKey, string> = {
    abstract: "Abstract",
    introduction: "Introduction",
    "related-work": "Related Work",
    methodology: "Methodology",
    experiments: "Experiments",
    results: "Results",
    discussion: "Discussion",
    conclusion: "Conclusion",
  };

  const cardRefs = useRef<Record<SectionKey, HTMLDivElement | null>>(
    {} as Record<SectionKey, HTMLDivElement | null>,
  );


  const {
    generateSection,
    isGenerating,
  } = usePaperWriter();

  const [generatingSection, setGeneratingSection] =
    useState<SectionKey | null>(null);

  const handleGenerateSection = async (
    section: SectionKey,
  ) => {
    try {
      setGeneratingSection(section);

      const response = await generateSection({
        draft_id: draftId,
        section: BACKEND_SECTION_MAP[section],
      });

      handleChange(section, response.content);
    } catch (error) {
      console.error(
        `Failed to generate ${section}:`,
        error,
      );
    } finally {
      setGeneratingSection(null);
    }
  };
  useEffect(() => {
    if (!paper) return;

    setContent(parsePaper(paper.content));
  }, [paper]);

  useEffect(() => {
    if (!paper) return;

    const markdown = buildPaper(content);

    // Don't save if nothing changed
    if (markdown === paper.content) return;

    setStatus("saving");

    updatePaperMutation.mutate(
      {
        draftId,
        content: markdown,
      },
      {
        onSuccess: () => {
          setStatus("saved");
          setLastSavedAt(new Date());
        },
        onError: () => {
          setStatus("unsaved");
        },
      },
    );
  }, [debouncedContent]);


  useEffect(() => {
    if (!paper) return;

    setTitle(paper.title);

  }, [paper]);


  const completion = useMemo(() => {
    const map = {} as Record<SectionKey, number>;

    for (const s of SECTIONS) {
      const words = content[s.key].trim()
        ? content[s.key].trim().split(/\s+/).length
        : 0;

      map[s.key] = Math.min(100, Math.round((words / 120) * 100));
    }

    return map;
  }, [content]);

  const wordCount = useMemo(
    () =>
      Object.values(content).reduce(
        (n, v) => n + (v.trim() ? v.trim().split(/\s+/).length : 0),
        0,
      ),
    [content],
  );

  const sectionsCompleted = Object.values(completion).filter(
    (v) => v >= 100,
  ).length;

  const scrollTo = (key: SectionKey) => {
    setActive(key);
    cardRefs.current[key]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleChange = (key: SectionKey, value: string) => {
    setContent((prev) => ({
      ...prev,
      [key]: value,
    }));

    setStatus("unsaved");
  };


  if (isLoading) {
    return <div>Loading paper...</div>;
  }

  if (isError || !paper) {
    return <div>Failed to load draft.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DraftHeader
        projectId={projectId}
        title={paper.title}
        topic={paper.topic}
        status={status}
        lastSavedAt={lastSavedAt}
      />

      <div className="mx-auto flex max-w-[1600px]">
        <SectionSidebar
          active={active}
          completion={completion}
          onSelect={scrollTo}
        />

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 lg:px-10">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <SectionNavigation
                active={active}
                completion={completion}
                onSelect={scrollTo}
              />
            </div>

            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Research Draft
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {paper.title}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Write, structure, and refine your paper section by section with
                AI-assisted drafting.
              </p>
            </div>

            <div className="space-y-6">
              {SECTIONS.map((s, i) => (
                <EditorSectionCard
                  key={s.key}
                  ref={(el) => {
                    cardRefs.current[s.key] = el;
                  }}
                  draftId={draftId}
                  section={s}
                  index={i}
                  value={content[s.key]}
                  onChange={(v) => handleChange(s.key, v)}
                  onFocus={() => setActive(s.key)}
                  active={active === s.key}
                />
              ))}
            </div>

            <div className="pointer-events-none sticky bottom-4 mt-8 flex justify-center">
              <div className="pointer-events-auto">
                <AIToolbar />
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden w-[320px] shrink-0 border-l border-border/60 bg-card/30 xl:block">
          <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto p-5">
            <AIAssistantPanel />

            <div className="mt-4">
              <PaperStatisticsCard
                wordCount={wordCount}
                sectionsCompleted={sectionsCompleted}
                totalSections={SECTIONS.length}
                referenceCount={0}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

}