import { createContext, useContext, useState } from "react";

// Tạo Context
const ChatContext = createContext();

// Provider để bọc ứng dụng
export const ChatProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);
  const [prompt,setPrompt] = useState("");

  // Hàm để kích hoạt cập nhật lịch sử chat
  const refreshHistory = () => {
    setHistoryRefreshTrigger(prev => prev + 1);
  };

  return (
    <ChatContext.Provider value={{ sessionId, setSessionId, refreshHistory, historyRefreshTrigger, prompt, setPrompt }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook để sử dụng Context
export const useChat = () => {
  return useContext(ChatContext);
};
