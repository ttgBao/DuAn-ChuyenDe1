import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.includes("@")) {
      setType("error");
      setMessage("Email không hợp lệ!");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setType("error");
      setMessage("Số điện thoại phải đúng 10 số!");
      return;
    }

    const pwRule =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    if (!pwRule.test(password)) {
      setType("error");
      setMessage(
        "Mật khẩu ≥ 6 ký tự gồm chữ thường, CHỮ HOA, số và ký tự đặc biệt!"
      );
      return;
    }

    if (password !== confirm) {
      setType("error");
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await axios.post(
        "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/register",
        {
          email,
          phone,
          fullName,      
          name: fullName,
          password
        }
      );

      console.log("REGISTER OK:", res.data);

      setType("success");
      setMessage("🎉 Đăng ký thành công! Đang chuyển sang đăng nhập...");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      setType("error");
      setMessage(
        err?.response?.data?.message ||
        "Đăng ký thất bại! Email có thể đã tồn tại."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-in fade-in slide-in-from-right-4 duration-300">

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
          ĐĂNG KÝ
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-semibold ${
              type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>

          <div className="mb-4">
            <label>Họ tên</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="mb-4">
            <label>Số điện thoại</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="text"
              maxLength={10}
            />
          </div>

          <div className="mb-4">
            <label>Email</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          <div className="mb-4">
            <label>Mật khẩu</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          <div className="mb-6">
            <label>Xác nhận mật khẩu</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              type="password"
            />
          </div>

          <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Đăng ký
          </button>
        </form>

        <p className="mt-4 text-center">
          Đã có tài khoản?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Đăng nhập ngay
          </span>
        </p>
      </div>
    </div>
  );
}
