import { useState } from "react";
import axios from  "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/login",
        { email, password }
      );

      console.log("LOGIN OK:", res.data);

      // lấy danh sách user
      const userRes = await axios.get(
        "https://ns414sbifk.execute-api.ap-southeast-1.amazonaws.com/api/users"
      );

      const user = userRes.data.find((u) => u.email === email);

      localStorage.setItem("userName", user?.name || user?.fullName || "User");
      localStorage.setItem("role", user?.role || "user");

      setType("success");
      setMessage(" Đăng nhập thành công!");

      if (res.data.token) localStorage.setItem("token", res.data.token);

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setType("error");
      setMessage("❌ Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-in fade-in slide-in-from-left-4 duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-3">
          ĐĂNG NHẬP
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

        <form onSubmit={handleLogin}>
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

          <div className="mb-6">
            <label>Mật khẩu</label>
            <input
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Đăng nhập
          </button>
        </form>

        <p className="mt-4 text-center">
          Chưa có tài khoản?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}
