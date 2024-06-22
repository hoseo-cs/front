"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

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
    <div className="w-full max-w-[1340px] mx-auto h-[80px] flex items-center bg-header-bg  justify-between">
      <img
        className="h-[60px] bg-header-bg text-white flex items-center "
        src="/assets/minilogo.png"
        alt="Logo"
      />
      <div className=" ml-auto flex ">
        <Link className="cursor-pointer mr-3" href="/community">
          커뮤니티
        </Link>
        <Link className="cursor-pointer  mr-3" href="/map">
          병원 찾기
        </Link>
        {/* <SearchBar /> */}
        <div className="cursor-pointer " onClick={handleMyPageClick}>
          마이페이지
        </div>
      </div>
    </div>
  );
};

export default Header;
