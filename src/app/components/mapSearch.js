"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MapSearch = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      router.push(`/map/${keyword}`);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex justify-center w-full"
    >
      <div
        className="w-full sm:w-[340px] h-[40px] flex pl-4 my-auto cursor-pointer border-solid border-2 border-sky-500 rounded-full
    text-sm sm:text-xs"
      >
        <input
          placeholder="동물 종, 거주지를 통해 병원을 검색해 보세요"
          className="flex-grow text-sm sm:text-xs bg-transparent outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="flex items-center pr-2">
          <Image alt="Search" width={20} height={20} src="/assets/search.png" />
        </button>
      </div>
    </form>
  );
};

export default MapSearch;
