"use client";
import { useParams, useRouter } from "next/navigation";

const layout = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id;
  return (
    <div>
      <div className="w-4/5 mx-auto border-solid border-2 border-sky-500">
        <div className="w-11/12 p-5 mx-auto flex bg-indigo-300 ">
          <div className="w-24 h-24 rounded-full bg-amber-400"></div>
          <div className="ml-5 flex my-auto">
            <div>닉네임: xxxx</div>
            <div>반려동물: 00000</div>
            <div>지역:xxxx시 0000구</div>
            <div className="ml-5">✏️</div>
          </div>
        </div>
        <div className=" w-11/12 mx-auto flex justify-between ">
          <div className=" mt-6 flex ">
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
          <div className="w-24 mt-6  rounded-2xl text-center bg-sky-300 ">
            로그아웃
          </div>
        </div>
        <div className="w-11/12 mt-20 mx-auto border-solid border-2 border-black">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
