import { useEffect, useState } from "react";
import RecordCard from "./recordCard";

const Records = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}record`;
        if (userId) {
          url = `${process.env.NEXT_PUBLIC_API_URL}record/user/${userId}`;
        }

        const response = await fetch(url);
        //console.log("response", response);
        const result = await response.json();
        if (result.status === "success") {
          console.log(result);
          setPosts(result.records);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center ">
      {posts.map((post) => (
        <RecordCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Records;
