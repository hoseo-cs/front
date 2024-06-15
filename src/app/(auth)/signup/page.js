"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalDefault from "../../components/modal/ModalDefault";
import SignupModal from "../../components/modal/alertSignup";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
    pet: "",
    city: "",
    district: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [usernameCheck, setUsernameCheck] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUsernameCheck = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: formData.username }),
      });
      const result = await response.json();
      setUsernameCheck(result.message);
    } catch (error) {
      console.error("아이디 중복 체크 중 오류 발생:", error);
      setUsernameCheck("아이디 중복 체크 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData); // 데이터 확인
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}signup`, {
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
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          router.push("/login");
        }, 1000);
      } else {
        setIsSuccess(false);
        setMessage(`회원가입에 실패했습니다. 에러 번호: ${response.status}`);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setIsSuccess(false);
      setMessage("회원가입 중 오류가 발생했습니다.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4 sm:p-0">
      <div className="bg-olive-200 w-full max-w-2xl p-8 space-y-6 shadow-lg sm:max-w-lg">
        <h2 className="text-center text-2xl font-bold">회원가입</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 w-28">
                아이디
              </label>
              <input
                type="text"
                name="username"
                className="mt-1 p-2 border border-gray-300 rounded-md flex-grow"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleUsernameCheck}
              className="mt-2 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              중복 체크
            </button>
            {usernameCheck && (
              <p
                className={`text-sm mt-2 ${
                  usernameCheck === "사용 가능한 아이디입니다."
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameCheck}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 w-28">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 border border-gray-300 rounded-md flex-grow"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 w-28">
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              className="mt-1 p-2 border border-gray-300 rounded-md flex-grow"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 w-28">
              사는 곳 (시)
            </label>
            <input
              type="text"
              name="city"
              className="mt-1 p-2 border border-gray-300 rounded-md flex-grow"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 w-28">
              사는 곳 (구)
            </label>
            <input
              type="text"
              name="district"
              className="mt-1 p-2 border border-gray-300 rounded-md flex-grow"
              value={formData.district}
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
              disabled={usernameCheck === "이미 존재하는 아이디입니다."}
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
