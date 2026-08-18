import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { EmptyChatState } from "./EmptyChatState";
import type { StudioMessage } from "@/types/ai_studio";

export function ChatWindow({
  messages,
  onPickSuggestion,
}: {
  messages: StudioMessage[];
  onPickSuggestion: (t: string) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return <EmptyChatState onPick={onPickSuggestion} />;
  }

  return (
    <div className="space-y-5 py-4">
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
