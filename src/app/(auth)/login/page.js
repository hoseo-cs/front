"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ModalDefault from "../../components/modal/defaultModal";

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      console.log("Already logged in", username);
      // 토큰이 존재하면 마이페이지로 리디렉션
      router.push(`/mypage/${username}`);
    } else {
      console.log("Not logged in");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token);
        setMessage("로그인에 성공했습니다!");
        setIsSuccess(true);
        setIsModalOpen(true);
        console.log("로그인 성공:", result.username);
        localStorage.setItem("token", result.token); // 토큰 저장
        localStorage.setItem("username", result.username);
        setTimeout(() => {
          setIsModalOpen(false);
          router.push(`/mypage/${result.username}`); // 로그인 완료 후 마이페이지로 이동
        }, 1000);
      } else {
        setMessage("다시 시도해 주세요.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setMessage("로그인 중 오류가 발생했습니다.");
      setIsSuccess(false);
    }
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
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              회원가입
            </button>
          </div>
        </form>
        {!isSuccess && (
          <p className="text-center text-red-500 mt-4">{message}</p>
        )}
      </div>
      <ModalDefault isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-center text-2xl font-bold">{message}</p>
      </ModalDefault>
    </div>
  );
};

export default LoginForm;
