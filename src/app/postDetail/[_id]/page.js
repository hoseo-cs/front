"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetail = () => {
  const post_id = useParams();
  const [post, setPost] = useState(null);
  let isMyPost = false;
  // console.log(post_id);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}post/${post_id._id}`
        );
        const result = await response.json();
        if (result.status === "success") {
          setPost(result.post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [post_id]);

  if (post) {
    const username = localStorage.getItem("username");

    if (username === post.userId) {
      isMyPost = true;
    }
  }

  return (
    post && (
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">
            {post.title}{" "}
            {isMyPost && (
              <span className="text-sm text-blue-500">내 게시물</span>
            )}
          </h1>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <span className="text-xl">{post.userId.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{post.userId}</h2>
          </div>
        </div>
        <div className="mb-4">
          <p>{post.content}</p>
        </div>
        {post.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {post.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}post/user/${post.userId}/image/${image}`}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default PostDetail;
