import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUserAuth } from "../hooks/userAuth";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import background from "../assets/image/login.png";
import gsap from "gsap";
import { Be } from "../constants";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  // Refs for animation
  const formRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Vui lòng nhập tài khoản"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`${Be}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error("Đăng nhập thất bại!");

        const data = await response.json();
        if (data?.access_token) {
          loginUser(data.user, data.access_token);
          setUserAuth(data.user, data.access_token, data.session_id);
          toast.success("Đăng nhập thành công");
          gsap.to(btnRef.current, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          });
          setTimeout(() => navigate("/"), 1000);
        }
      } catch (error) {
        toast.error("Lỗi đăng nhập! Hãy kiểm tra lại thông tin.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className=" min-h-screen w-full bg-cover bg-center p-4 md:p-6 lg:p-8"
      style={{ backgroundImage: `url(${background})` }}
    >

      <div className="px-4 py-6">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            TRƯỜNG ĐẠI HỌC KỸ THUẬT CÔNG NGHIỆP
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mt-2">
            VIỆN NGHIÊN CỨU PHÁT TRIỂN CÔNG NGHỆ CAO KỸ THUẬT CÔNG NGHIỆP
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center mt-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            TRUNG TÂM CÔNG NGHỆ VÀ ĐỔI MỚI SÁNG TẠO
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center  p-4 md:p-6 lg:p-8 mt-20">
        <div className="relative shadow-xl max-w-md w-full mx-auto">
          <div
            ref={formRef}
            className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-3 sm:p-4"
          >
            <div className="w-full p-2 sm:p-4 flex flex-col justify-center items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center text-white leading-tight">
                ĐĂNG NHẬP HỆ THỐNG HỖ TRỢ ÔN TẬP MÔN TOÁN LỚP 12 KỲ THI THPT 2025
              </h2>
              <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3 w-full">
                <div>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto px-4 py-2 rounded-md transition text-sm sm:text-base font-medium ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                  </button>

                  <Link to="/register" className="w-full sm:w-auto text-center sm:text-right">
                    <span className="underline text-gray-200 font-medium text-sm sm:text-base">
                      Bạn chưa có tài khoản?
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;