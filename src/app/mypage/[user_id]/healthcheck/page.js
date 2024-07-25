"use client";
import { useParams } from "next/navigation";
import Records from "./records.js";

const page = () => {
  const params = useParams();
  const id = params.user_id;
  return (
    <div>
      <div className="flex">
        <div className="font-bold"> {id}</div>님의 게시물
      </div>
      <Records userId={id} />
    </div>
  );
};

export default page;
