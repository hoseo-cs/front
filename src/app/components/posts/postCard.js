const PostCard = () => {
  return (
    <div className="w-[460px] h-[160px] rounded-lg flex bg-slate-200">
      <div className="mx-auto my-auto flex ">
        <div className=" w-[105px] h-[105px] rounded-lg border-solid border-2 border-sky-500">
          image
        </div>
        <div className="w-[300px] ml-[10px]">
          <div className="h-[50px] my-auto p-[10px] bg-orange-500 rounded-2xl">
            작성자 명
          </div>
          <div>게시글 </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
