"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id;
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    pet: "",
    city: "",
    district: "",
    profilePictureUrl: "",
  });
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}user/info`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setUserInfo(data);
          setImageUrl(
            `${process.env.NEXT_PUBLIC_API_URL}upload/profile/${user_id}`
          );
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [user_id, imageUrl]);

  const inputProfile = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);

      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("userId", user_id);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}upload/profile`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        if (result.status === "success") {
          setImageUrl(
            `${process.env.NEXT_PUBLIC_API_URL}upload/profile/${user_id}`
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)]   bg-gray-100 flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center sm:[grid-template-columns:1fr_2fr]">
      <div className="max-w-7xl w-[395px] sm:w-[395px]  h-full   bg-white p-6 drop-shadow-md sm:drop-shadow-2xl ">
        <div className="text-center drop-shadow-xl mt-6">
          <form
            className="w-[110px] h-[110px] rounded-full bg-amber-400 relative m-auto   "
            onSubmit={(e) => e.preventDefault()} // 폼 기본 제출 동작 막기
          >
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-amber-200 text-white rounded-full flex items-center justify-center transform translate-x-1/3 cursor-pointer">
              <label htmlFor="file-input" className="p-2 cursor-pointer">
                ➕
              </label>
              <input
                id="file-input"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={inputProfile}
              />
            </div>
            {imageUrl && (
              <img
                className="w-[110px] h-[110px] rounded-full "
                src={imageUrl}
                alt="profile"
              />
            )}
          </form>

          <div className="mt-3">
            <div className="text-2xl font-bold">{userInfo.nickname}</div>
            <div className="text-gray-600 mt-2">반려 동물: {userInfo.pet}</div>
            <div className="text-gray-600 mt-1">
              {userInfo.city} {userInfo.district}
            </div>
          </div>
        </div>
        <div className="text-lg mt-10 text-end sm:mt-20 sm:text-start ">
          <div className="hover:underline ">프로필 수정하기</div>
          <div className="mt-2 hover:underline ">문의하기</div>
          <button
            className="text-sm text-blue-500 mt-2 hover:underline "
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="w-full h-full ">
        <div className="flex justify-evenly mt-16 ">
          <button
            className="px-4 py-2  bg-amber-200 text-black rounded-md transition-colors duration-300 hover:bg-amber-400"
            onClick={() => router.push(`/mypage/${user_id}/posts`)}
          >
            게시판
          </button>
          <button
            className="px-4 py-2 bg-amber-200 text-black rounded-md transition-colors duration-300 hover:bg-amber-400"
            onClick={() => router.push(`/mypage/${user_id}/healthcheck`)}
          >
            건강기록
          </button>
          <button
            className="px-4 py-2  bg-amber-200 text-black rounded-md transition-colors duration-300 hover:bg-amber-400"
            onClick={() => router.push(`/mypage/${user_id}/write`)}
          >
            게시글 작성
          </button>
        </div>

        <div className="mt-12 p-2 sm:mt-6 ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
