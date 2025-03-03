import { useState, useRef, useEffect } from "react";
import {
  getAccessToken,
  getCurrentSessionID,
} from "../hooks/userAuth";
import { useChat } from "../hooks/ChatContext";
import "katex/dist/katex.min.css";

import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";

import LatexInput from "./LatexInput";
import ModalBox from "./ModalBox";
import toast from "react-hot-toast";
import { Be } from "../constants";

const Chat = () => {

  const chatRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const { sessionId, refreshHistory, prompt, setPrompt, refreshChat } = useChat();
  const [showPopup, setShowPopup] = useState(false);
  const [changeInput, setchangeInput] = useState(true);

  const fullMessage = prompt
    ? `${input}\n\n$${prompt}$`
    : input;


  console.log("fullMessage", fullMessage);
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
    fetchMessages();
  }, [sessionId]);

  //=============================================================== [Call API getChatStore chat] ===============================================================
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${Be}/chat/session/${sessionId == null ? getCurrentSessionID() : sessionId
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();
      setMessages(data);
      setMessagesData(data.messages);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  //=============================================================== [Call API sendMessage chat] ===============================================================
  const sendMessage = async () => {

    if (input === "") {
     return toast.error("Hãy hỏi để gửi");
    } 
    
    //input
    if (!input.trim()) return;
    const newMessage = { role: "user", content: fullMessage };
    setMessagesData((prev) => [...prev, newMessage]);
    setInput("");
    setPrompt("")



    //call api
    try {
      const response = await fetch(
        `${Be}/query?session_id=${sessionId == null ? getCurrentSessionID() : sessionId
        }&text=${encodeURIComponent(fullMessage)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();

      setMessagesData((prev) => [
        ...prev,
        { role: "bot", content: data.reply },
      ]);

      await fetchMessages();

      if (refreshHistory) {
        refreshHistory();
      }
      if (refreshChat) {
        refreshChat();
      }

    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messagesData]); // Chỉ cuộn khi có tin nhắn mới

  const formatDate = (isoString) => {
    if (!isoString || isNaN(Date.parse(isoString))) {
      return "..."; // Trả về dấu "..." nếu timestamp không hợp lệ
    }
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const formatLatexContent = (content) => {
    return content
      .replace(/\\\[/g, "$$")  // Chuyển tất cả \[ thành $$
      .replace(/\\\]/g, "$$")  // Chuyển tất cả \] thành $$
      .replace(/\\\(/g, "$")   // Chuyển tất cả \( thành $
      .replace(/\\\)/g, "$");  // Chuyển tất cả \) thành $
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const closePopupOnOutsideClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      setShowPopup(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 relative">
      {/* Header */}
      <div className="relative shadow-xl w-full max-w-lg">
        <div className="relative z-20 w-full max-w-lg mx-auto bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 flex justify-center items-center">
          <span className="text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-lg text-center">
            Tôi là chuyên gia toán
          </span>
        </div>
        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>

      {/* Chat Body */}
      <div className="relative shadow-xl w-full max-w-lg chat-container overflow-y-auto overflow-hidden no-scrollbar">
        <div className="relative z-20 w-full">
          <div className="grid place-items-center h-[400px] sm:h-[450px] md:h-[500px] w-full max-w-lg mx-auto bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">




            <div
              ref={chatRef}
              className="p-3 sm:p-4 md:p-6 h-full w-full overflow-y-auto overflow-hidden no-scrollbar"
            >
              {messagesData.map((msg, index) => (
                <div key={index} className="mb-3">
                  <div
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`py-1 px-2 max-w-[80%] sm:max-w-[75%] rounded-lg break-words ${msg.role === "user"
                        ? "bg-green-500 text-white" // Tin nhắn user: xanh
                        : "bg-gray-200 text-gray-700" // Tin nhắn bot: xám
                        }`}
                    >
                      {msg.content ? (
                        <ReactMarkdown
                          children={formatLatexContent(msg.content)}
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          className="markdown text-sm sm:text-base"
                        />
                      ) : (
                        <p>...</p>
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex text-gray-300 text-xs ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <i> {formatDate(msg.timestamp)}</i>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>

      {/* Input */}
      <div className="relative shadow-xl w-full max-w-lg">
        <div className="relative z-20 w-full max-w-lg mx-auto bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 md:p-4 p-4">
          <p className="text-gray-300 absolute md:-top-0 top-1 right-4 text-xs sm:text-sm italic">
            Hãy hỏi để gửi
          </p>
          <div className="flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Bạn muốn hỏi gì ạ..."
              onChange={handleChange}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className={`w-full mt-2 px-3 sm:px-4 py-2 sm:py-3 rounded-3xl bg-white/20 text-white shadow-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-200 text-sm sm:text-base 
                `}
            />

            {changeInput === true ?
              (
                <></>
              ) : (
                <LatexInput sendMessage={sendMessage} />
              )
            }

          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex gap-1">
              <button
                className="transition-all duration-300 hover:scale-110 w-[150px] px-1 py-1 rounded-3xl bg-white/20 text-white shadow-md border border-white/30 text-sm sm:text-base"
                onClick={() => setchangeInput(!changeInput)}
              >
                {changeInput ? "Nhập công thức" : "Đóng công thức"}
              </button>
              <button className="transition-all duration-300 hover:scale-110 px-3 py-1 rounded-3xl bg-white/20 text-white shadow-md border border-white/30 text-sm sm:text-base" onClick={() => setShowPopup(true)}>
                Xem prompt
              </button>
             

            </div>

            <div>
              <button className="transition-all duration-300 hover:scale-110 px-3 py-1 rounded-3xl bg-white/20 text-white shadow-md border border-white/30 text-sm sm:text-base" onClick={() => sendMessage()}>
                gửi
              </button>
            </div>

          
          </div>
         
        </div>
        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>




      {showPopup && (
        <div
          ref={chatRef}
          className="p-3 sm:p-4 md:p-6 h-[300px] shadow-xl w-full max-w-lg mx-auto rounded-3xl  absolute z-50 top-0 bg-white/30 backdrop-blur-sm"
        >
          <ModalBox closePopupOnOutsideClick={closePopupOnOutsideClick} fullMessage={fullMessage} setShowPopup={setShowPopup} sendMessage={sendMessage} />
        </div>

      )}
    </div>
  );
};

export default Chat;