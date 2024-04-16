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

  const user_id = 2333333434;
  return (
    mounted && (
      <div className="w-full h-[80px] flex  bg-header-bg">
        <div className="w-[212px] h-[40px] ml-[20px] my-auto text-center bg-black text-white">
          LOGO
        </div>
        <Link className="my-auto ml-[16px] cursor-pointer" href="/community">
          커뮤니티
        </Link>
        <Link className="my-auto ml-[16px]  cursor-pointer" href="/map">
          병원 찾기
        </Link>
        <div className=" mx-auto my-auto w-[340px]">
          <SearchBar />
        </div>
        <div
          className="my-auto  mr-[50px] cursor-pointer"
          onClick={() => router.push(`/mypage/${user_id}/posts`)}
        >
          마이페이지
        </div>
      </div>
    )
  );
};

export default Header;

/* 

Link와 Routing 차이
Link -> 정적 페이지
URL 구조: 정적 페이지는 /about, /contact와 같은 고정된 URL 구조를 사용합니다.
사용 사례: 블로그 게시물, 제품 페이지, 랜딩 페이지와 같은 변경되지 않는 콘텐츠를 표시하는 데 적합합니다.

Routing
동적 페이지:

런타임 렌더링: 동적 페이지는 요청 시 런타임으로 렌더링됩니다. 
이는 데이터베이스에서 데이터를 가져오거나 사용자 입력에 따라 콘텐츠를 생성하는 데 유용합니다.
URL 구조: 동적 페이지는 /posts/[id], /users/[username]와 같은 
매개 변수를 포함하는 URL 구조를 사용합니다.
사용 사례: 블로그 게시물 상세 페이지, 
사용자 프로필 페이지, 제품 목록 페이지와 같은 변경 가능한 콘텐츠를 표시하는 데 적합합니다.
*/
