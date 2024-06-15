"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id;
  //console.log(user_id);
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
            `${process.env.NEXT_PUBLIC_API_URL}user/info`, // 수정: user_id 추가
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
  }, [user_id, imageUrl]); // 수정: user_id를 의존성 배열에 추가

  const inputProfile = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);

      const formData = new FormData();
      formData.append("image", selectedImage); // "image"로 이름 수정
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
        //console.log(result);
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
    <div>
      <div className="w-4/5 mx-auto border-solid border-2 border-sky-500">
        <div className="w-11/12 p-2 mx-auto flex bg-indigo-300 relative">
          <form
            className="w-20 h-20 rounded-full bg-amber-400 relative"
            onSubmit={(e) => e.preventDefault()} // 폼 기본 제출 동작 막기
          >
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center transform translate-x-1/3 cursor-pointer">
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
                className="w-20 h-20 rounded-full"
                width={100}
                src={imageUrl}
                alt="profile"
              />
            )}
          </form>

          <div className="ml-5 flex my-auto">
            <div>닉네임: {userInfo.nickname}</div>
            <div>반려동물: {userInfo.pet}</div>{" "}
            <div>
              지역: {userInfo.city} {userInfo.district}
            </div>
            <div className="ml-5">✏️</div>
          </div>
        </div>
        <div className="w-11/12 mx-auto flex justify-between">
          <div className="mt-3 flex">
            <button
              className="w-24 rounded-2xl text-center bg-sky-300"
              onClick={() => router.push(`/mypage/${user_id}/posts`)}
            >
              게시판
            </button>
            <button
              className="w-24 ml-5 rounded-2xl text-center bg-sky-300"
              onClick={() => router.push(`/mypage/${user_id}/healthcheck`)}
            >
              건강기록
            </button>
            <button
              className="w-24 ml-5 rounded-2xl text-center bg-sky-300"
              onClick={() => router.push(`/mypage/${user_id}/write`)}
            >
              게시글 작성
            </button>
          </div>
          <button
            className="w-24 mt-3 rounded-2xl text-center bg-sky-300"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <div className="w-11/12 mt-2 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
