import { useEffect, useId, useRef, useState } from "react";
import IntroHero, { AssistantAvatar } from "./IntroHero";
import PromtInput from "./PromtInput";

const newId = (prefix: string) =>
  `${prefix}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const STARTER_PROMPTS = [
  "Summarize this page for me",
  "Draft a short reply to a customer email",
  "Explain this feature in plain language",
  "Give me 5 headline ideas for a launch post",
];

const ChatWindow = ({ onClose }: { onClose?: () => void }) => {
  const titleId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef(0);
  const [entered, setEntered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [awaitingReply, setAwaitingReply] = useState(false);

  const showIntro = messages.length === 0;

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(replyTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (showIntro) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, awaitingReply, showIntro]);

  const resetChat = () => {
    window.clearTimeout(replyTimerRef.current);
    setMessages([]);
    setAwaitingReply(false);
  };

  const handleSend = (text: string) => {
    window.clearTimeout(replyTimerRef.current);

    const userMsg: ChatMessage = {
      id: newId("u"),
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);
    setAwaitingReply(true);

    const reply: ChatMessage = {
      id: newId("a"),
      role: "assistant",
      content:
        "Here’s a sample reply — swap this for your model or streaming API. The layout keeps your prompt on the right and answers on the left, similar to the references you shared.",
    };

    replyTimerRef.current = window.setTimeout(() => {
      setMessages((m) => [...m, reply]);
      setAwaitingReply(false);
    }, 900);
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 flex h-dvh min-h-0 w-[min(100%,420px)] flex-col overflow-hidden rounded-none border-y border-l border-zinc-200/90 bg-white/95 text-left text-zinc-800 backdrop-blur-md transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-150 ${
        entered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-zinc-100 bg-white px-4 py-3">
        <div className="min-w-0">
          <h2 id={titleId} className="truncate text-sm font-semibold tracking-tight text-zinc-900">
            AI Chat
          </h2>
          <p className="truncate text-xs text-zinc-500">Zara</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={resetChat}
            className="rounded-full bg-zinc-900 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
          >
            New chat
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
              aria-label="Close chat"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {showIntro ? (
        <div className="flex min-h-0 flex-1 flex-col bg-linear-to-b from-zinc-50 to-white">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-5 py-8 text-center">
            <IntroHero />
            <div className="max-w-xs space-y-2">
              <p className="text-sm font-medium text-zinc-600">Hey there,</p>
              <p className="text-xl font-semibold tracking-tight text-zinc-900">What can I help with?</p>
              <p className="text-sm leading-relaxed text-zinc-500">
                Pick a starter below or type your own question. This is UI-only until you wire an API.
              </p>
            </div>
          </div>
          <div className="shrink-0 border-t border-zinc-100/80 bg-white/70 px-4 pb-2 pt-3 backdrop-blur-sm">
            <p className="mb-2 text-left text-[11px] font-medium uppercase tracking-wide text-zinc-400">Try asking</p>
            <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {STARTER_PROMPTS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleSend(label)}
                  className="min-w-[200px] max-w-[240px] shrink-0 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-left text-[13px] leading-snug text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  <span className="mr-1.5 inline-block text-zinc-400" aria-hidden>
                    ✦
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={listRef}
          className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-linear-to-b from-zinc-50 to-white px-4 py-5"
        >
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[88%] rounded-2xl bg-zinc-100 px-4 py-2.5 text-[15px] leading-relaxed text-zinc-800">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start gap-3">
                <AssistantAvatar />
                <p className="max-w-[min(100%,320px)] pt-0.5 text-[15px] leading-relaxed text-zinc-700">{m.content}</p>
              </div>
            ),
          )}

          {awaitingReply && (
            <div className="flex justify-start gap-3">
              <AssistantAvatar />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="chat-typing-dot size-2 rounded-full bg-zinc-300" />
                <span className="chat-typing-dot size-2 rounded-full bg-zinc-300" />
                <span className="chat-typing-dot size-2 rounded-full bg-zinc-300" />
                <span className="sr-only">Zara is typing…</span>
              </div>
            </div>
          )}
        </div>
      )}

      <PromtInput
        onSend={handleSend}
        disabled={awaitingReply}
        placeholder="Ask anything…"
        footerHint="AI can make mistakes. Check important info."
      />
    </div>
  );
};

export default ChatWindow;
