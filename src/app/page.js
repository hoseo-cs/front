"use client";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const HomePage = () => {
  const slideData = [
    { id: 0, title: "커뮤니티", text: "증상과 성장을 공유" },
    { id: 1, title: "챗봇", text: "챗봇을 통해 증상 파악" },
    { id: 2, title: "건강기록", text: "기록지로 자세하게 케어" },
  ];
  const imagePath = [
    `/assets/background/커뮤니티.png`,
    `/assets/background/챗봇.png`,
    `/assets/background/건강기록.png`,
  ];

  return (
    <div className="w-full max-w-[1340px] h-auto lg:h-[620px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 px-4 lg:px-0 overflow-hidden mb-2">
      <section className="relative col-span-1 lg:col-span-4 rounded-xl overflow-hidden h-[300px] lg:h-full shadow-xl">
        <img
          src="/assets/background/landing.png"
          alt="Background"
          className="absolute w-full h-full object-cover"
        />
        <img
          src="/assets/background/landing3.png"
          alt="Background"
          className="absolute w-full h-full object-cover z-10 opacity-55"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-white p-4 rounded-lg">
          <h1 className="text-2xl lg:text-4xl font-bold ">
            특별한 친구를 위한
          </h1>
          <h1 className="text-2xl lg:text-4xl font-bold ">
            특별한 케어 서비스
          </h1>
          <p className="text-3xl lg:text-5xl font-bold mt-2 text-orange-500">
            ACARE
          </p>
        </div>

        <div className="absolute bottom-6 right-2 w-full lg:w-auto h-1/3 flex items-end justify-end p-4 lg:p-0 z-10">
          <button className="px-4 py-2 bg-white text-black rounded-full flex items-center space-x-2 shadow-lg transform hover:translate-y-1 hover:shadow-xl transition">
            <Link href="/map" className="flex items-center z-20s">
              병원 찾아보기
              <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center ml-2 shadow-inner">
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </Link>
          </button>
        </div>
      </section>

      <aside className="flex flex-col lg:ml-4  rounded-lg space-y-6 mt-6 lg:mt-0 col-span-1 lg:col-span-1 h-auto lg:h-full overflow-y-auto">
        <div className="bg-yellow-300  rounded-lg shadow-md w-full h-48 flex flex-col justify-between relative">
          <img
            src="/assets/background/landing2.png"
            alt="Cover"
            className="absolute rounded-lg w-full h-full object-cover z-0 opacity-65"
          />
          <p className="text-center text-sm mt-2 z-10 ">
            특수 동물들을 진료하는 병원들
          </p>
          <p className="text-center text-2xl font-bold my-auto z-10">191 곳</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md w-full  relative ">
          {" "}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {slideData.map((slide) => (
              <SwiperSlide className="rounded-lg" key={slide.id}>
                {" "}
                <img
                  src={imagePath[slide.id]}
                  alt="Cover"
                  className="absolute w-full h-full object-cover z-0 opacity-65"
                />
                <div className="h-40 relative">
                  <p className=" text-center text-sm font-bold bg-black text-white inline-block px-2 py-1 mt-2 ml-2 rounded-full">
                    {slide.title}
                  </p>
                  <p className=" text-center text-lg font-bold mt-10">
                    {slide.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full flex hidden lg:flex">
          <div className="flex-1 mx-2 flex justify-center items-center bg-white rounded-full p-6">
            <img src="/assets/git.png" alt="Github" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
