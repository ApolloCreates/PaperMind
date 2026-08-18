import { useRef, useState, type KeyboardEvent } from "react";
import { Mic, Paperclip, SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ChatInput({
    onSend,
    disabled,
    loading,
}: {
    onSend: (text: string) => Promise<void> | void;
    disabled?: boolean;
    loading?: boolean;
}) {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLTextAreaElement>(null);

    const submit = async () => {
        const t = value.trim();

        if (!t || loading) return;

        await onSend(t);

        setValue("");

        ref.current?.focus();
    };
    const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
        }
    };

    return (
        <div className="sticky bottom-0 z-10 bg-gradient-to-t from-background via-background to-transparent pb-4 pt-6">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-3 shadow-lg backdrop-blur">
                <Textarea
                    disabled={disabled || loading}
                    ref={ref}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKey}
                    rows={2}
                    placeholder={
                        disabled
                            ? "Select a paper to start chatting..."
                            : "Ask anything about the selected paper..."
                    }
                    className="min-h-[52px] resize-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0"
                />
                <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={loading} className="h-8 gap-1.5 rounded-lg">
                            <Paperclip className="h-4 w-4" />
                            <span className="hidden sm:inline">Attach Paper</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={loading}
                            className="h-8 gap-1.5 rounded-lg opacity-60"
                        >
                            <Mic className="h-4 w-4" />
                            <span className="hidden sm:inline">Voice</span>
                        </Button>
                    </div>
                    <Button
                        size="sm"
                        onClick={submit}
                        disabled={
                            disabled ||
                            loading ||
                            !value.trim()
                        }
                        className={cn(
                            "h-8 gap-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md hover:opacity-95",
                        )}
                    >
                        {loading ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Thinking...
                            </>
                        ) : (
                            <>
                                <SendHorizonal className="h-4 w-4" />
                                Send
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Press <kbd className="rounded bg-muted px-1 py-0.5">Enter</kbd> to send ·{" "}
                <kbd className="rounded bg-muted px-1 py-0.5">Shift + Enter</kbd> for a new line
            </p>
        </div>
    );
}
