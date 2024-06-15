const HomePage = () => {
  return (
    <div className="min-h-screen h-auto bg-gray-100">
      <header className="bg-teal-500 text-white p-6 text-center">
        <h1 className="text-4xl font-bold">ACARE에 오신 것을 환영합니다!</h1>
        <p className="mt-2 text-xl">특수 동물들을 위한 특별한 공간</p>
      </header>
      <main className="py-10">
        <section className="flex flex-wrap justify-center">
          <div className="max-w-sm bg-white m-4 p-6 rounded-lg shadow-lg">
            <h2 className="mt-4 text-2xl font-semibold">커뮤니티</h2>
            <p className="mt-2 text-gray-600">
              경험공유와 챗봇 서비스를 통해 도움을 줍니다.
            </p>
          </div>
          <div className="max-w-sm bg-white m-4 p-6 rounded-lg shadow-lg">
            <h2 className="mt-4 text-2xl font-semibold">병원 찾기</h2>
            <p className="mt-2 text-gray-600">
              그동안 특수 동물 병원 따로 찾기 힘드셨죠? 이제는 지역만 검색하시면
              됩니다.
            </p>
          </div>
          <div className="max-w-sm bg-white m-4 p-6 rounded-lg shadow-lg">
            <h2 className="mt-4 text-2xl font-semibold">건강 기록 관리</h2>
            <p className="mt-2 text-gray-600">
              동물의 건강을 기록해보세요 급한 상황일 때, 병을 견뎌냈을 때
              필요해요!
            </p>
          </div>
        </section>
      </main>
      <footer className="bg-teal-500 text-white p-4 text-center">
        <p>&copy; 2024 ACARE. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
