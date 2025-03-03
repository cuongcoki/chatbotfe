import { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";
import "mathlive";
import { useChat } from "../hooks/ChatContext";

const LatexInput = () => {
  const mathFieldRef = useRef(null);
  const { setPrompt ,refreshChat} = useChat();

  useEffect(() => {
    if (mathFieldRef.current && mathFieldRef.current.children.length === 0) {
      const mfe = new MathfieldElement();
  
      mfe.setAttribute("placeholder", "nhập + công + thức");
  
      mfe.classList.add(
        "w-full", "py-1",
        "rounded-full", "bg-white/30", "text-white", "shadow-md",
        "border", "border-white/50", "focus:outline-none",
        "focus:ring-2", "focus:ring-green-400", "placeholder-gray-200",
        "text-base", "sm:text-lg"
      );
  
      mfe.addEventListener("input", () => {
        setPrompt(mfe.value);
      });
  
      // Đảm bảo gọi được sendMessage khi nhấn Enter
      mfe.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          setPrompt("");
          refreshChat()
          mfe.setValue(""); 
        }
      });
  
      mathFieldRef.current.appendChild(mfe);
    }
  }, [ setPrompt]);;



  return (
    <>
      <div ref={mathFieldRef} className="w-full" />
    </>
  );
};

export default LatexInput;
