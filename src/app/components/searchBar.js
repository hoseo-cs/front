"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";

const SearchBar = () => {
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
        // const search = e.target.value;
        // const options = {
        //   //수정할때는 push나 patch사용.
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ title, body }),
        // };
        // fetch("" + keyword, options)
        //   .then((res) => res.json()) // json화를 꼭 시켜줘야함
        //   .then((result) => {
        //     console.log(result);
        //     router.refresh();
        //     router.push(`/map/${result.id}`);
        //   });
      }}
    >
      <div
        className="w-[340px] h-[40px] flex pl-[20px] my-auto cursor-pointer border-solid border-2 border-sky-500 rounded-[20px]
    text-[10px]"
      >
        <input
          placeholder="동물 종, 거주지를 통해 병원을 검색해 보세요"
          className="w-[340px] text-[10px] bg-transparent"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <Image
          alt="Landscape picture"
          width={37}
          height={26}
          src="/assets/search.png"
        ></Image>
      </div>
    </form>
  );
};

export default SearchBar;
