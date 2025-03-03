import { useEffect, useState } from "react";
import { Be } from "../constants";

const Footer = () => {


  const [tracking, setTracking] = useState({});

  const fetchTracking = async () => {
    try {
      const response = await fetch(`${Be}/tracking`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Lỗi khi lấy dữ liệu.");
      }

      const data = await response.json();
      setTracking(data);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    fetchTracking();
  }, []);



  return (
    <div className="w-full">
      <div className="relative shadow-xl">
        <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 px-2">
          <div className="relative">
            {/* Footer */}
            <div className="p-2 text-center flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white">© Copyright @GIRC</p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-white text-sm">
                <p>
                  👤 Đang online:{" "}
                  <span className="font-semibold">
                    {tracking.Active_user || 0}
                  </span>
                </p>
                <p className="hidden sm:block">•</p>
                <p>
                  📊 Số lượt truy cập:{" "}
                  <span className="font-semibold">
                    {tracking.Total_visit || 0}
                  </span>
                </p>
                <p className="hidden sm:block">•</p>
                <p>
                  📞 Liên hệ:{" "}
                  <span className="font-semibold">
                    0904031103 | cuong@gmail.com
                  </span>
                </p>
              </div>

              <div className="flex justify-center gap-4 text-white">
                <a
                  href="https://www.facebook.com/girctuaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/@girctuaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  YouTube
                </a>
                <a
                  href="https://www.facebook.com/girctuaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>
    </div>
  );
};

export default Footer;
