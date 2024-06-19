import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-[1340px] h-[630px] mx-auto  flex flex-col lg:flex-row justify-between">
      <section className="relative flex-1   rounded-xl overflow-hidden">
        <img
          src="/path-to-image.jpg"
          alt="Background"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute top-1/4 left-1/4 text-white z-10">
          <h1 className="text-4xl font-bold text-black">특별한 친구를 위한</h1>
          <h1 className="text-4xl font-bold text-black">특별한 케어 서비스 </h1>
          <p className="text-5xl font-bold mt-2 text-blue-600">ACARE</p>
        </div>

        <div className="absolute bottom-8 right-2  w-full h-1/3 flex items-end justify-end">
          <button className="px-4 py-2 bg-black text-white rounded-full flex items-center space-x-2">
            <Link href="/map">병원 찾아보기 </Link>
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

      <aside className="flex flex-col ml-4 space-y-6 mt-6 lg:mt-0 ">
        <div className="bg-yellow-300 p-4 rounded-lg shadow-md w-48 h-48  flex flex-col justify-between">
          <p className="text-center text-sm">특수 동물들을 진료하는 병원들</p>
          <p className="text-center text-2xl font-bold">59,352,891 건</p>
          <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full mx-1"></div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg w-48 h-72 shadow-md  ">
          <p className="text-center text-sm font-bold bg-black text-white inline-block px-2 py-1 rounded-full">
            커뮤니티
          </p>
          <p className="text-center text-lg font-bold mt-2">
            증상과 성장을 공유
          </p>
          <p className="text-center text-sm text-gray-600 mt-1">
            #챗봇 #건강한디지털
          </p>
          <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-black rounded-full mx-1"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full mx-1"></div>
          </div>
        </div>

        <div className="bg-gray-200 p-4  rounded-lg shadow-md w-48 flex ">
          <button className="text-2xl">&lt;</button>
          <div className="flex-1 mx-2 flex justify-center items-center bg-white rounded-full p-6">
            {/* <p className="text-lg">github</p> */}
            <img src="/assets/git.png"></img>
          </div>
          <button className="text-2xl">&gt;</button>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;
