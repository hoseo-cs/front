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
    { id: 1, title: "커뮤니티", text: "증상과 성장을 공유" },
    { id: 2, title: "챗봇", text: "챗봇을 통해 증상 파악" },
    { id: 3, title: "건강 기록지", text: "기록지로 자세하게 케어" },
  ];

  return (
    <div className="w-full max-w-[1340px] h-auto lg:h-[620px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 px-4 lg:px-0 overflow-hidden">
      <section className="relative col-span-1 lg:col-span-4 rounded-xl overflow-hidden h-[300px] lg:h-full shadow-xl">
        <img
          src="/assets/landingMap.png"
          alt="Background"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-2xl lg:text-4xl font-bold text-white">
            특별한 친구를 위한
          </h1>
          <h1 className="text-2xl lg:text-4xl font-bold text-white">
            특별한 케어 서비스
          </h1>
          <p className="text-3xl lg:text-5xl font-bold mt-2 text-orange-300">
            ACARE
          </p>
        </div>

        <div className="absolute bottom-8 right-2 w-full lg:w-auto h-1/3 flex items-end justify-end p-4 lg:p-0">
          <button className="px-4 py-2 bg-black text-white rounded-full flex items-center space-x-2">
            <Link href="/map">병원 찾아보기</Link>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
          </button>
        </div>
      </section>

      <aside className="flex flex-col lg:ml-4 space-y-6 mt-6 lg:mt-0 col-span-1 lg:col-span-1 h-auto lg:h-full overflow-y-auto">
        <div className="bg-yellow-300 p-4 rounded-lg shadow-md w-full h-48 flex flex-col justify-between">
          <p className="text-center text-sm">특수 동물들을 진료하는 병원들</p>
          <p className="text-center text-2xl font-bold my-auto">
            59,352,891 건
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full h-72">
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
              <SwiperSlide className="" key={slide.id}>
                <div className="h-40">
                  <p className=" text-center text-sm font-bold bg-black text-white inline-block px-2 py-1 rounded-full">
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
