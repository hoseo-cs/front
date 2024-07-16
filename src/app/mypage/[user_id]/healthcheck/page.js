"use client";
import { useParams } from "next/navigation";
import TextInfo from "./textInfo";

const HealthCheckPage = () => {
  const params = useParams();
  const id = params.user_id;

  return (
    <div className="text-xs sm:text-base">
      {id}님의 반려동물 건강기록
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  px-0 sm: px-3  py-8 justify-between ">
        <div className="w-full h-[400px] rounded-2xl  bg-pink-100 text-center">
          사진
        </div>
        <div className="  mt-4 sm:mt-0 ">
          <TextInfo />
        </div>
      </div>
    </div>
  );
};

export default HealthCheckPage;
