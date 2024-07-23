"use client";
import { useParams } from "next/navigation";
import TextInfo from "./textInfo";

const HealthCheckPage = () => {
  const params = useParams();
  const id = params.user_id;

  return (
    <div className="text-xs sm:text-base">
      {id}님의 반려동물 건강기록
      <TextInfo />
    </div>
  );
};

export default HealthCheckPage;
