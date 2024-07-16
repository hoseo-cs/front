"use client";
import { useState } from "react";

const TextInfo = () => {
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length + images.length > 1) {
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
        alert("건강기록이 성공적으로 업로드되었습니다.");
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
    <form className="h-full flex justify-around" onSubmit={handleSubmit}>
      <div className="w-1/2 h-full grid grid-cols-2 gap-6 content-center rounded-2xl  border-2 border-orange-500">
        <div>
          이름:
          <input />
        </div>
        <div>몸무게 :0000g</div>
        <div>처음 만난 곳 :0000000병원 </div>
        <div>정확한 품종 명: 00000 000</div>
        <div> 지병: 0000,00000,000</div>
      </div>

      <div className="w-1/3 border-2  grid grid-cols-1 gap-6 content-center rounded-2xl  border-emerald-500">
        <div>
          나이:XX세
          <div>(생일: 0000년 00월 00일)</div>
        </div>
        <div>복용중인 약: 000정,00환,000,00</div>
      </div>
    </form>
  );
};

export default TextInfo;
