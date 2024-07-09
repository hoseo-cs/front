"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
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
      <Link href="/">
        <img
          className="h-[60px] bg-header-bg text-white flex items-center cursor-pointer"
          src="/assets/minilogo.png"
          alt="Logo"
        />
      </Link>
      <div className=" ml-auto flex hidden sm:flex ">
        {/*flex hidden을 함께 사용하면 hidden이 우선 적용되어 요소가 숨겨짐 */}
        {/* 640px 이상일 때(sm) flex가 나옴-> hidden 클래스가 무시되고 flex가 적용 */}
        <Link className="cursor-pointer mr-3" href="/community">
          커뮤니티
        </Link>
        <Link className="cursor-pointer  mr-3" href="/map">
          병원 찾기
        </Link>
        {/* <SearchBar /> */}
        <div className="cursor-pointer mr-4" onClick={handleMyPageClick}>
          마이페이지
        </div>
      </div>
      <div className="sm:hidden">
        {" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-[10px] mr-4">
              메뉴
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-28 bg-white rounded-[10px]">
            <DropdownMenuSeparator className="" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex justify-center items-center h-8">
                <Link className="cursor-pointer " href="/community">
                  커뮤니티
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-center items-center h-8">
                <Link className="cursor-pointer  " href="/map">
                  병원 찾기
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-center items-center h-8">
                <div className="cursor-pointer " onClick={handleMyPageClick}>
                  마이페이지
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
