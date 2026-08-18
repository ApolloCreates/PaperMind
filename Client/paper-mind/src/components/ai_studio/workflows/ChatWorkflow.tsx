import { useState } from "react";

import { ChatInput } from "../ChatInput";
import { ChatWindow } from "../ChatWindow";

import { RequirementNotice } from "../shared";

import { useAIStudio } from "@/hooks/useAIStudio";

import type {
  StudioMessage,
  StudioPaper,
} from "@/types/ai_studio";

type Props = {
  selectedPapers: StudioPaper[];
};

export function ChatWorkflow({
  selectedPapers,
}: Props) {
  const [messages, setMessages] = useState<StudioMessage[]>([]);

  const { chat, loadingChat } = useAIStudio();

  const handleSend = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      },
    ]);

    try {
      const response = await chat({
        paper_id: selectedPapers[0].id,
        question: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response.answer,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, something went wrong while contacting the AI service.",
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  if (selectedPapers.length !== 1) {
    return (
      <RequirementNotice
        message={
          selectedPapers.length === 0
            ? "Select 1 paper from the Paper Context panel to start chatting."
            : "Chat with Paper works on exactly one paper. Deselect extras to continue."
        }
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        <ChatWindow
          messages={messages}
          onPickSuggestion={handleSend}
        />
      </div>

      <ChatInput
        onSend={handleSend}
        loading={loadingChat}
      />
    </div>
  );
}