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
  });

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
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [router]);

  return (
    <div>
      <div className="w-4/5 mx-auto border-solid border-2 border-sky-500">
        <div className="w-11/12 p-2 mx-auto flex bg-indigo-300 ">
          <div className="w-20 h-20 rounded-full bg-amber-400"></div>
          <div className="ml-5 flex my-auto">
            <div>닉네임: {userInfo.nickname}</div>
            <div>반려동물: {userInfo.pet}</div>
            <div>
              지역: {userInfo.city} {userInfo.district}
            </div>
            <div className="ml-5">✏️</div>
          </div>
        </div>
        <div className=" w-11/12 mx-auto flex justify-between ">
          <div className=" mt-3 flex ">
            <button
              className="w-24 rounded-2xl text-center bg-sky-300 "
              onClick={() => router.push(`/mypage/${user_id}/posts`)}
            >
              게시판
            </button>
            <button
              className="w-24  ml-5 rounded-2xl text-center bg-sky-300  "
              onClick={() => router.push(`/mypage/${user_id}/healthcheck`)}
            >
              건강기록
            </button>
          </div>
          <button
            className="w-24 mt-3 rounded-2xl text-center bg-sky-300"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <div className="w-11/12 mt-2 mx-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
