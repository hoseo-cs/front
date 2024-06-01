"use client";
import SignupModal from "@/app/components/modal/alertSignup";
import ModalDefault from "@/app/components/modal/defaultModal";
import { useState } from "react";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
    pet: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setMessage("회원가입에 성공했습니다!");
      } else {
        setIsSuccess(false);
        setMessage(`회원가입에 실패했습니다. 에러 번호: ${response.status}`);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setIsSuccess(false);
      setMessage("회원가입 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 sm:p-0">
      <div className="bg-olive-200 w-full max-w-md p-8 space-y-6 shadow-lg sm:max-w-xs">
        <h2 className="text-center text-2xl font-bold">회원가입</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              키우고 있는 동물
            </label>
            <input
              type="text"
              name="pet"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              value={formData.pet}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              회원 가입
            </button>
          </div>
        </form>
        <ModalDefault
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SignupModal isSuccess={isSuccess} message={message} />
        </ModalDefault>
      </div>
    </div>
  );
};

export default SignupForm;
