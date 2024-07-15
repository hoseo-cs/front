"use client";
import TopButton from "../components/button/topBtn";
import ChatBotBtn from "../components/chatBot/chatBotBtn";
import Posts from "../components/posts/posts";

const CommunityPage = () => {
  return (
    <div className="w-full">
      <div className="h-[250px] text-center bg-lime-200">배너이미지</div>
      <div className=" max-w-[1150px]  mx-auto ">
        <Posts />
        <TopButton />
      </div>

      <ChatBotBtn />
    </div>
  );
};
export default CommunityPage;
{
  /* <WriteBtn /> */
}
