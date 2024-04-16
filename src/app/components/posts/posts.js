import PostCard from "./postCard";

const Posts = () => {
  const posts = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="mt-[60px] grid grid-cols-2 gap-4 place-items-center border-solid border-2 border-red-200">
      {posts.map((post) => (
        <PostCard key={post} />
      ))}
    </div>
  );
};

export default Posts;
