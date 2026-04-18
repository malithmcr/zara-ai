import { useCallback, useRef, type FormEvent, type KeyboardEvent } from "react";

const TEXTAREA_MAX_PX = 208; // matches max-h-52

type PromtInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  footerHint?: string;
};

const PromtInput = ({
  onSend,
  disabled,
  placeholder = "Ask anything…",
  footerHint = "Enter to send · Shift+Enter for new line",
}: PromtInputProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = useCallback(() => {
    const form = formRef.current;
    if (!form || disabled) return;
    const data = new FormData(form);
    const raw = (data.get("message") as string) ?? "";
    const text = raw.trim();
    if (!text) return;
    onSend(text);
    form.reset();
    const ta = textareaRef.current;
    if (ta) ta.style.height = "";
  }, [disabled, onSend]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="shrink-0 border-t border-zinc-100 bg-white/90 px-4 pb-4 pt-3 backdrop-blur-sm"
    >
      <div className="flex items-end gap-2 rounded-full bg-zinc-100 px-4 py-2 transition-colors focus-within:bg-zinc-100/90">
        <textarea
          ref={textareaRef}
          name="message"
          rows={1}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onKeyDown}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_PX)}px`;
          }}
          className="max-h-52 min-h-12 w-full resize-none bg-transparent py-2.5 text-[15px] leading-relaxed text-zinc-800 placeholder:text-zinc-400 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled}
          className="mb-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:pointer-events-none disabled:opacity-40"
          aria-label="Send message"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M12 5v14M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="mt-2.5 text-center text-[11px] leading-snug text-zinc-400">{footerHint}</p>
    </form>
  );
};

export default PromtInput;
