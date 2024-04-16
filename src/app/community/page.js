"use client";
import ChatBotBtn from "../components/chatBot/chatBotBtn";
import Posts from "../components/posts/posts";
import SearchBar from "../components/searchBar";
import TopButton from "../components/button/topBtn";
import WriteBtn from "../components/button/writeBtn";

const CommunityPage = () => {

  return (
    <div className=" ">
      <div className="max-w-[1440px] h-[250px] text-center bg-lime-200">
        배너이미지
      </div>
      <div className=" max-w-[1150px]  mx-auto border-solid border-2 border-sky-500">
        <div className="w-[470px] mt-[60px] flex ml-96 ">
          <SearchBar />
          <div className="ml-3">
            <WriteBtn />
          </div>
        </div>
        <Posts />
        <TopButton />
      </div>

      <ChatBotBtn />
    </div>
  );
};
export default CommunityPage;
