import { useMutation } from "@tanstack/react-query";

import * as aiStudio from "@/services/aiStudio.service";

export function useChat() {
  return useMutation({
    mutationFn: ({
      paperId,
      question,
    }: {
      paperId: string;
      question: string;
    }) =>
      aiStudio.chat(
        paperId,
        question,
      ),
  });
}

export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  content: string;

  createdAt: Date;
}