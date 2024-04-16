"use client";
import Posts from "@/app/components/posts/posts";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const id = params.user_id;
  return (
    <div>
      <div className="flex">
        <div className="font-bold"> {id}</div>님의 게시물
      </div>
      <Posts />
    </div>
  );
};

export default page;
