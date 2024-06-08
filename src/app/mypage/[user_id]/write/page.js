"use client";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const id = params.user_id;

  return (
    <form className="w-full">
      <div className="w-full flex justify-between ">
        <div className="w-1/12 rounded-full text-center border-2 border-black">
          제목
        </div>
        <input
          className="w-10/12 rounded-full pl-4 border-2 border-black"
          placeholder="제목을 입력하세요"
        ></input>
      </div>
      <div className=" h-[460px] flex justify-between mt-3">
        <textarea className="w-4/6 border-2 border-black">
          게시글 내용을 입력해주세요
        </textarea>
        <div className="w-[310px]  ">
          <div className="w-[310px] h-[310px] rounded-2xl mx-auto pt-36 text-center bg-slate-200">
            사진 추가
          </div>
          <div className="w-[310px] my-2 mx-auto flex justify-between">
            <div className="w-[100px] h-[100px] rounded-2xl border-2 border-lime-400">
              사진
            </div>
            <div className="w-[100px] h-[100px] rounded-2xl border-2 border-lime-400">
              사진
            </div>
            <div className="w-[100px] h-[100px] rounded-2xl border-2 border-lime-400">
              사진
            </div>
          </div>
          <button className="w-[310px] mx-auto rounded-2xl border-2 border-lime-400">
            게시글 등록
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
