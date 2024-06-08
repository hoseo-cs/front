"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMyPageClick = () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/mypage/${username}`);
    } else {
      router.push("/login");
    }
  };

  return (
    mounted && (
      <div className="w-full h-[80px] flex flex-wrap items-center bg-header-bg p-4 sm:flex-nowrap sm:p-0">
        <div className="w-full sm:w-auto h-[40px] text-center bg-black text-white flex items-center justify-center mb-2 sm:mb-0 sm:ml-[20px]">
          LOGO
        </div>
        <div className="w-full sm:w-auto flex justify-around sm:justify-start sm:space-x-4 mb-2 sm:mb-0">
          <Link className="cursor-pointer" href="/community">
            커뮤니티
          </Link>
          <Link className="cursor-pointer" href="/map">
            병원 찾기
          </Link>
        </div>
        <div className="w-full sm:w-[340px] flex justify-center sm:mx-auto mb-2 sm:mb-0">
          <SearchBar />
        </div>
        <div
          className="w-full sm:w-auto flex justify-center sm:justify-end cursor-pointer"
          onClick={handleMyPageClick}
        >
          마이페이지
        </div>
      </div>
    )
  );
};

export default Header;
