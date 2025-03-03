import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import background from "../assets/image/login.png";
import dataTinh from "../data/danh_sach_tinh.json";
import dataTHPT from "../data/THPT.json"
import Select from "react-select";
import gsap from "gsap";
import { Be } from "../constants";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      inputRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      ho_va_ten: "",
      sdt: "",
      email: "",
      password: "",
      facebook: "",
      noi_o: "",
      ten_truong: "",
    },
    validationSchema: Yup.object({
      ho_va_ten: Yup.string().required("Vui lòng nhập họ và tên"),
      sdt: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại , 10 số "),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
      facebook: Yup.string(),
      noi_o: Yup.string().required("Vui lòng chọn nơi ở"),
      ten_truong: Yup.string().required("Vui lòng chọn trường THPT"),
    }),

    onSubmit: async (values) => {
      console.log(values)
      setLoading(true);
      try {
        const response = await fetch(`${Be}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ho_va_ten: values.ho_va_ten,
            sdt: values.sdt,
            email: values.email,
            password: values.password,
            facebook: values.facebook,
            noi_o: values.noi_o,
            ten_truong: values.ten_truong,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          toast.error( data?.detail);
          throw new Error(
            data?.message ||
            "Đăng ký thất bại! Vui lòng kiểm tra lại thông tin."
          );
        }
        toast.success("Đăng ký thành công");
        navigate("/login");
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
  });

  // console.log("dataTinh", dataTinh)
  // console.log("dataTHPT", dataTHPT.data.map((data) => data.ma_tinh))
  // console.log("dataTHPT", dataTHPT.data.map((data) => data))


  const [selectedProvince, setSelectedProvince] = useState(null);
  const filteredSchools = selectedProvince
    ? dataTHPT.data.filter((school) => school.ma_tinh === selectedProvince.id)
    : [];

  // console.log("filteredSchools", filteredSchools.map((school) => school.data.data.map((data) => data)))



  const options = filteredSchools.flatMap((school) =>
    school.data.data.map((data) => ({
      id: data.id,
      value: data.text,
      label: data.text,
    }))
  );

  // console.log("options", options);
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center p-4 md:p-6 lg:p-8"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="relative shadow-xl max-w-md w-full mx-auto">
        <div 
        className="relative z-20 bg-green-700 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 p-3 sm:p-4"
          ref={formRef}>
          <div className="w-full p-2 sm:p-4 flex flex-col justify-center items-center">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center text-white leading-tight">
              ĐĂNG KÝ HỆ THỐNG HỖ TRỢ ÔN TẬP MÔN TOÁN LỚP 12 KỲ THI THPT NĂM
              2025
            </h2>

            <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3 w-full">
              {/* Họ và tên */}
              <div>
                <input
                  type="text"
                  name="ho_va_ten"
                  placeholder="Họ và tên"
                  className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={formik.values.ho_va_ten}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ho_va_ten && formik.errors.ho_va_ten && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <input
                  type="text"
                  name="sdt"
                  placeholder="Số điện thoại"
                  className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={formik.values.sdt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.sdt && formik.errors.sdt && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.sdt}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* password */}
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
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Facebook */}
              <div>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formik.values.facebook}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.facebook && formik.errors.facebook && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.facebook}
                  </p>
                )}
              </div>

              {/* Nơi ở */}
              <div>
                <Select
                  name="noi_o"
                  options={dataTinh.data.map((province) => ({
                    id: province.id,
                    value: province.text,
                    label: province.text,
                  }))}
                  placeholder="Chọn nơi ở..."
                  isSearchable
                  className="w-full"
                  value={dataTinh.data.find((option) => option.value === formik.values.noi_o)}
                  onChange={(selectedOption) => {
                    setSelectedProvince(selectedOption);
                    formik.setFieldValue("noi_o", selectedOption ? selectedOption.value : "");
                  }}
                  onBlur={() => formik.setFieldTouched("noi_o", true)}
                />
                {formik.touched.noi_o && formik.errors.noi_o && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.noi_o}</p>
                )}
              </div>

              {/* console.log("filteredSchools", filteredSchools.map((school) => school.data.data.map((data) => data.id))) */}

              <div>
                <Select
                  name="ten_truong"
                  placeholder="Chọn trường THPT..."
                  isSearchable
                  options={options}
                  className="w-full"
                  value={options.find((option) => option.value === formik.values.ten_truong)}
                  onChange={(selectedOption) =>
                    formik.setFieldValue("ten_truong", selectedOption ? selectedOption.value : "")
                  }
                  onBlur={() => formik.setFieldTouched("ten_truong", true)}
                />
                {formik.touched.ten_truong && formik.errors.ten_truong && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.ten_truong}</p>
                )}
              </div>

              {/* Nút Đăng ký & Đăng nhập */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="w-52 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                >
                  Đăng Ký
                </button>

                <Link to={"/login"}>
                  <span className="underline text-gray-200 font-medium">
                    Bạn đã có tài khoản?
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="absolute -inset-1 bg-green-500 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 z-10"></div>
      </div>
    </div>
  );
};

export default Register;
