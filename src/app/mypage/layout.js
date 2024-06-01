"use client";
import { useParams, useRouter } from "next/navigation";

const layout = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id;
  return (
    <div>
      <div className="w-4/5 mx-auto border-solid border-2 border-sky-500">
        <div className="w-11/12 p-2 mx-auto flex bg-indigo-300 ">
          <div className="w-20 h-20 rounded-full bg-amber-400"></div>
          <div className="ml-5 flex my-auto">
            <div>닉네임: xxxx</div>
            <div>반려동물: 00000</div>
            <div>지역:xxxx시 0000구</div>
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
          <button className="w-24 mt-3  rounded-2xl text-center bg-sky-300 ">
            로그아웃
          </button>
        </div>
        <div className="w-11/12 mt-2 mx-auto ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
