import { useRouter } from "next/navigation";
const RecordCard = ({ post }) => {
  const router = useRouter();
  const imageUrl =
    post.images.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}post/user/${post.userId}/image/${post.images[0]}`
      : null;
  //console.log(post._id);

  const handleClick = () => {
    router.push(`/postDetail/${post._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full  max-w-sm h-[160px] rounded-lg flex bg-slate-100 drop-shadow-md sm:drop-shadow-2xl items-center p-2  transform transition-transform duration-300 sm:hover:scale-105 hover:bg-slate-200"
    >
      <div className="w-full flex">
        {imageUrl && (
          <div className="w-[105px] h-[105px] rounded-lg ">
            <img
              src={imageUrl}
              alt="동물 사진"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-2/3 ml-[10px] flex flex-col justify-center ">
          <div className=" w-full h-[50px] text-black  truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {post.title}
          </div>
          <div className="w-full text-sm text-gray-600   ">{post.userId}</div>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
