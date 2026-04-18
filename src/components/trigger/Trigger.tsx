import type { ReactNode } from "react";
import { useState } from "react";
import ChatWindow from "../chat/ChatWindow";
type TriggerProps = {
  icon: ReactNode;
  text: string;
};

const Trigger = ({ icon, text }: TriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    
    {!isOpen && <div className="fixed bottom-6 left-[50%] translate-x-[-50%] text-center">
      <button
        type="button"
        aria-label={text}
        className="group inline-flex items-center rounded-full bg-[#38cdb7] px-3 py-2.5 text-white shadow-md shadow-black/20 cursor-pointer transition-[padding,transform,box-shadow] duration-420 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0 hover:px-4 hover:shadow-lg hover:shadow-black/25 hover:scale-[1.02] focus-visible:px-4 focus-visible:shadow-lg focus-visible:shadow-black/25 focus-visible:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        onClick={handleTriggerClick}
      >
        <span className="trigger-icon-spin flex shrink-0 items-center justify-center" aria-hidden>
          {icon}
        </span>
        <span className="grid grid-cols-[0fr] overflow-hidden transition-[grid-template-columns] duration-480 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:duration-0 group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
          <span className="min-w-0">
            <span className="inline-block whitespace-nowrap pl-2 pr-0.5 opacity-0 translate-x-2 transition-[opacity,transform] duration-380 ease-[cubic-bezier(0.16,1,0.3,1)] delay-0 motion-reduce:duration-0 group-hover:delay-40 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:delay-40 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
              {text}
            </span>
          </span>
        </span>
      </button>
    </div>
    }
    </>
  );
};

export default Trigger;
