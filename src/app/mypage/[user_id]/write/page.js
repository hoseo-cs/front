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
        router.push(`/mypage/${userId}`);
      } else {
        alert("게시글 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full flex justify-between">
        <div className="w-1/12 rounded-full text-center border-2 border-black">
          제목
        </div>
        <input
          className="w-10/12 rounded-full pl-4 border-2 border-black"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="h-[460px] flex justify-between mt-3">
        <textarea
          className="w-4/6 border-2 border-black"
          placeholder="게시글 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="w-[310px]">
          <div className="w-[310px] h-[310px] rounded-2xl mx-auto pt-36 text-center bg-slate-200">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="w-[310px] my-2 mx-auto flex justify-between">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-[100px] h-[100px] rounded-2xl border-2 border-lime-400"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
          <button className="w-[310px] mx-auto rounded-2xl border-2 border-lime-400">
            게시글 등록
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
