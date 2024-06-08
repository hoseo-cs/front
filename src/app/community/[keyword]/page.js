"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "../../components/posts/postCard";

const SearchResults = () => {
  const { keyword } = useParams();
  const [posts, setPosts] = useState([]);
  const decodedKeyword = decodeURIComponent(keyword);
  console.log(decodedKeyword);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}post/search/${decodedKeyword}`
        );
        const result = await response.json();
        if (result.status === "success") {
          setPosts(result.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [keyword]);

  return (
    <div className="max-w-[1150px] mx-auto mt-[60px]">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default SearchResults;
