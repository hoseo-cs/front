import { useRouter } from "next/navigation";
const PostCard = ({ post }) => {
  const router = useRouter();
  const imageUrl =
    post.images.length > 0
      ? `${process.env.NEXT_PUBLIC_API_URL}post/user/${post.userId}/image/${post.images[0]}`
      : null;
  console.log(post._id);

  const handleClick = () => {
    router.push(`/postDetail/${post._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[460px] h-[160px] rounded-lg flex bg-slate-200"
    >
      <div className="mx-auto my-auto flex">
        {imageUrl && (
          <div className="w-[105px] h-[105px] rounded-lg border-solid border-2 border-sky-500">
            <img
              src={imageUrl}
              alt="post"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-[300px] ml-[10px]">
          <div className="h-[50px] my-auto p-[10px] bg-orange-500 rounded-2xl">
            {post.userId}
          </div>
          <div>{post.title}</div>
          <div>{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
