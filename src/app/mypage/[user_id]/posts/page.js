"use client";
import { useParams } from "next/navigation";
import Posts from "../../../components/posts/posts";

const page = () => {
  const params = useParams();
  const id = params.user_id;
  return (
    <div>
      <div className="flex">
        <div className="font-bold"> {id}</div>님의 게시물
      </div>
      <Posts userId={id} />
    </div>
  );
};

export default page;
