"use client";
import { useParams } from "next/navigation";
import TextInfo from "./textInfo";

const HealthCheckPage = () => {
  const params = useParams();
  const id = params.user_id;

  return (
    <div>
      {id}님의 반려동물 건강기록
      <div className="flex px-3 py-8 justify-between">
        <div className="w-[300px] h-[400px] rounded-2xl  bg-pink-100 text-center">
          사진
        </div>
        <div className="w-8/12 rounded-2xl border-2 border-amber-700">
          <TextInfo />
        </div>
      </div>
    </div>
  );
};

export default HealthCheckPage;
