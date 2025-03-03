
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { useChat } from '../hooks/ChatContext';
const ModalBox = ({ closePopupOnOutsideClick, fullMessage, setShowPopup,sendMessage }) => {
    const handleSentMessage = () => {
        setShowPopup(false);
        sendMessage();
        setPrompt("");
    };
 const { setPrompt } = useChat();
    const formatLatexContent = (content) => {
        return content
          .replace(/\\\[/g, "$$")  // Chuyển tất cả \[ thành $$
          .replace(/\\\]/g, "$$")  // Chuyển tất cả \] thành $$
          .replace(/\\\(/g, "$")   // Chuyển tất cả \( thành $
          .replace(/\\\)/g, "$");  // Chuyển tất cả \) thành $
      };
    return (
        <div
        
            onClick={() => closePopupOnOutsideClick && setShowPopup(false)}
        >
            <div
                className="p-6 rounded-lg "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="my-4 py-1 px-2 text-black h-[200px]  w-full  rounded-lg break-words overflow-y-auto overflow-hidden no-scrollbar">
                <Latex>{formatLatexContent(fullMessage)}</Latex>
                {/* <Latex>{formatLatexContent(text)}</Latex> */}
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSentMessage}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors shadow-lg"
                    >
                        gửi đoạn chát
                    </button>

                    <button
                        onClick={() => setShowPopup(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors shadow-lg"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalBox;

// Let me know if you want me to tweak anything else! 🚀
