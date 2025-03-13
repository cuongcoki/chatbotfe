const Inforexam = () => {
  const fakeData = [
    {
      id: 1,
      name: "Trợ lý Ai hỗ trợ đào tạo theo chương trình 2018 ",
      link: "https://chatgpt.com/g/g-HlvpxnG7j-tro-ly-ai-ho-tro-dao-tao-theo-chuong-trinh-2018",
      co: "sắp có"
    },
    {
      id: 2,
      name: "Gia sư GPT Toán - có xác suất thống kê",
      link: "https://chatgpt.com/g/g-AkLLsDYTE-tro-ly-ai-toan",
      co: "sắp có"
    },
    {
      id: 3,
      name: "Gia sư GPT Vật Lý",
      link: "https://chatgpt.com/g/g-WJIibbhBt-tro-ly-ai-vat-ly",
      co: "sắp có"
    },
    {
      id: 4,
      name: "Gia sư GPT Hóa",
      link: "https://chatgpt.com/g/g-igcWkeGfL-gia-su-hoa-hoc",
      co: "sắp có"
    },
    {
      id: 5,
      name: "Gia sư GPT Tiếng Anh ",
      link: "https://chatgpt.com/g/g-rMMA240zV-gia-su-tieng-anh",
      co: "sắp có"
    },


  ];


  const linksQA = [
    {
      link: "https://www.topcv.vn/nghe-it-la-gi#nganh-it-la-gi",
      name: "Ngành IT là gì?",
    },
    {
      link: "https://www.facebook.com/girctuaf/posts/pfbid023n4Pe6QAMpRG9fdePKCajhENRsBVcn8ZPdougV5jddnKJA3AVkKXs8xfW95uTKmjl",
      name: "TUYỂN SINH 2025 – HÃY TRỞ THÀNH CHIẾN BINH CHUYỂN ĐỔI SỐ!",
    },
    {
      link: "https://www.facebook.com/girctuaf/posts/pfbid0NDfVjUp85apkUtVS2x3vkXhnqzJanxAekwFo7t9zt23EPjrU2b4PjPW67Nrk7LTAl",
      name: "CƠ HỘI VÀNG NHẬN HỌC BỔNG GIÁO SƯ QUỐC TẾ TẠI VIỆT NAM!",
    },
    {
      link: "https://www.youtube.com/watch?v=sLlc4sCwPlE&ab_channel=GeoInformaticsResearchCenter%28GIRC-TUAF%29",
      name: "Tất niên đầm ấm tại Trung tâm Nghiên cứu Địa tin học",
    },
  ];
  return (
  <>
    <div className="w-full px-2 sm:px-4 md:px-0 flex justify-center">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-lg w-full">
        {/* First Card */}
        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              {/* Tiêu đề */}
              <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
                Các trợ lý học tập
              </div>

              {/* Danh sách lịch sử */}
              <div className="h-64 sm:h-80 md:h-50 no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-2 sm:py-3 px-2 sm:px-4 flex flex-col gap-2 sm:gap-4">
                {fakeData.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:underline w-full p-2 border-b border-gray-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="text-sm sm:text-base ">🎓 {item.name}</span>
                      {/* <span className="text-sm sm:text-base mt-3 w-[30%] text-red-500 bg-white px-2 py-1 rounded-3xl ">{item.co}</span> */}
                    </div>
                  </a>
                ))}
              </div>
              <div className=" flex justify-center items-center w-full mt-3 px-4 py-2 bg-green-500 
                rounded-xl shadow-lg text-white font-semibold text-center 
                hover:bg-green-600 transition duration-300 cursor-pointer">
              
              <a  href="https://www.facebook.com/messages/t/231405816731658" target="_blank"
                      rel="noopener noreferrer" > Nhận thêm các gia sư khác</a>
            </div>
            </div>

           

          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>

        {/* Second Card */}
        <div className="relative shadow-xl w-full">
          <div className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-2 sm:p-3 flex justify-center items-center">
            <div className="w-full">
              <div className="mx-0 sm:mx-2">
                <div className="text-lg sm:text-xl p-2 rounded-3xl text-center font-semibold text-gray-200 shadow-md py-2">
                  Có thể bạn quan tâm
                </div>

                <div className="h-48 sm:h-[185px] no-scrollbar overflow-y-auto rounded-b-lg scroll-smooth shadow-md py-2 sm:py-3 px-2 sm:px-4 flex flex-col gap-2 sm:gap-4">
                  {linksQA.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-white hover:text-blue-800 flex justify-between items-center text-sm sm:text-base"
                    >
                      <span>
                        <p className="inline-block text-red-500">* </p> {item.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>


          </div>

          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>
      </div>
    </div>

  </>
  );
};

export default Inforexam;