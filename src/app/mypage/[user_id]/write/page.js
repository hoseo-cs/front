"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.user_id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length + images.length > 4) {
      alert("최대 4개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("게시글이 성공적으로 업로드되었습니다.");
        setTitle("");
        setContent("");
        setImages([]);
        router.push(`/mypage/${userId}/posts`);
      } else {
        alert("게시글 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <form className="w-full  text-[12px] sm:text-base" onSubmit={handleSubmit}>
      <div className="w-full flex justify-between">
        <div className="w-1/12 rounded-full text-center ">제목</div>
        <input
          className="w-10/12  pl-4 border-2 border-slate"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="h-[460px] grid grid-cols-1 sm:grid-cols-2  gap-4 mt-3">
        <textarea
          className="w-full aspect-[4/1]  sm:aspect-square border-2 border-gray-200"
          placeholder="게시글 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="w-full ">
          <div className="w-full aspect-[4/1]  sm:aspect-[3/2]  rounded-2xl mx-auto pt-36 pb-2 text-center bg-slate-200">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="w-[310px] sm:w-full my-2 mx-auto flex justify-between">
            {images.map((image, index) => (
              <div key={index} className="w-[100px] h-[100px] rounded-2xl ">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <button className="w-[310px] rounded-2xl p-2 bg-amber-200">
              게시글 등록
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
