"use client";
import { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 기능 구현 예정
    console.log("Login data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 sm:p-0">
      <div className="bg-olive-200 w-full max-w-md p-8 space-y-6 shadow-lg sm:max-w-xs">
        <h2 className="text-center text-2xl font-bold">로그인</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              type="text"
              name="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
