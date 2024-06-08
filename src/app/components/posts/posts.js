import { useEffect, useState } from "react";
import PostCard from "./postCard";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}post/user/${userId}`
        );
        console.log("response", response);
        const result = await response.json();
        if (result.status === "success") {
          console.log(result);
          setPosts(result.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="mt-[60px] grid grid-cols-2 gap-4 place-items-center">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
