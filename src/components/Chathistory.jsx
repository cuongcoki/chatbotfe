import { useEffect, useState } from "react";
import { getUserAuth, getAccessToken } from "../hooks/userAuth";
import { Be, formatDate } from "../constants";
import { useChat } from "../hooks/ChatContext";
import toast from "react-hot-toast";
import userguid from "../constants/Hướng_dẫn_sử_dụng_chatbot.docx.pdf"
import userguid1 from "../constants/MẸO SỬ DỤNG CHATGPT CÓ HIỆU QUẢ.pdf"

const Chathistory = () => {
  const [user, setUser] = useState(null);
  const [messagesHistory, setMessagesHistory] = useState([]);
  const { setSessionId, sessionId, historyRefreshTrigger } = useChat();

  useEffect(() => {
    const authUser = getUserAuth();
    setUser(authUser);
  }, []);

  useEffect(() => {
    if (user) {
      fetchHistoryMessages(user.sub);
    }
  }, [user, historyRefreshTrigger]); // Thêm historyRefreshTrigger để lắng nghe khi cần cập nhật

  //=============================================================== [Call API getHistory chat] ===============================================================

  const fetchHistoryMessages = async (userId) => {
    try {
      const response = await fetch(
        `${Be}/chat/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }

      const data = await response.json();
      setMessagesHistory(data.title_list);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  //=============================================================== [Call API createNewSession chat] ===============================================================

  const createNewSession = async () => {
    try {
      const response = await fetch(
        `${Be}/chat/create_session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu chat.");
      }
      console.log(sessionId);
      const data = await response.json();
      setSessionId(data.session_id);
      fetchHistoryMessages(user.sub);
      toast.success("Tạo chat mới thành công");
    } catch (error) {
      console.error("Lỗi API:", error);
      toast.error("Không tạo được chat mới");
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-0 flex justify-center">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-lg w-full">
        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              {/* Tiêu đề */}
              <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
                Lịch sử tra cứu học tập
              </div>

              {/* Danh sách lịch sử */}
              <div className="h-64 sm:h-80 md:h-96 w-full min-w-[250px] sm:min-w-[290px] max-w-full no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-3 px-2 sm:px-4 flex flex-col gap-3 sm:gap-4">
                {messagesHistory.map((item) => (
                  <div
                    key={item.session_id}
                    className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
                    ${sessionId === item.session_id
                        ? "border bg-green-500 shadow-lg text-white"
                        : "hover:bg-green-500 hover:text-white text-white shadow-lg"
                      }`}
                    onClick={() => setSessionId(item.session_id)}
                  >
                    <div className="font-semibold text-sm sm:text-base">{item.title}</div>
                    <div className="text-xs sm:text-sm mt-1 flex justify-between items-center text-gray-300">
                      <i>{formatDate(item.timestamp)}</i>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nút Chat Mới */}
              <div className="mt-3 sm:mt-4 shadow-xl flex justify-center items-center">
                <button
                  onClick={createNewSession}
                  className="bg-green-500 w-full sm:w-[200px] z-20 rounded-3xl backdrop-blur-md font-semibold text-center px-4 py-2 text-white shadow-md transition-transform transform hover:scale-105 hover:bg-green-500"
                >
                  Chat mới
                </button>
              </div>
            </div>

          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>


        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              {/* Tiêu đề */}
              <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
              Hướng dẫn sử dụng
              </div>

              {/* Danh sách lịch sử */}
              <div className="h-48 sm:h-[115px] no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-2 sm:py-3 px-2 sm:px-4 flex flex-col gap-2 sm:gap-4">
                <a
                  href={userguid} // Đường dẫn đến file PDF
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-3 py-1 rounded-3xl  bg-white/20 text-white shadow-md border border-white/30 text-sm sm:text-base transition-all duration-300 hover:scale-110">
                  ✨ Hướng dẫn sử dụng - Trợ Lý Toán
                  </button>
                </a>

                <a
                  href={userguid1} // Đường dẫn đến file PDF
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-3 py-1 rounded-3xl  bg-white/20 text-white shadow-md border border-white/30 text-sm sm:text-base transition-all duration-300 hover:scale-110">
                  ✨ Mẹo sử dụng - Gia Sư GPT
                  </button>
                </a>
              </div>


            </div>

          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Chathistory;