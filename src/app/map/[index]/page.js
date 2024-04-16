"use client";

import { useParams } from "next/navigation";
import List from "../list";

const MapPage = () => {
  const params = useParams();
  const decoded = decodeURIComponent(params.index);

  return (
    <div className="max-w-[1150px] mx-auto overflow-x-hidden border-solid border-2 border-green-500">
      <div className="w-[280px] mt-[35px] border-solid border-2 border-sky-500">
        검색어:{decoded}
      </div>
      <div className=" h-[580px] flex border-solid border-2 border-red-500">
        <div className="w-[970px] h-full bg-yellow-500 border-solid border-2 border-yellow-500"></div>
        <List />
      </div>
    </div>
  );
};

export default MapPage;
