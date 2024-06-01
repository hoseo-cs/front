import KakaoMap from "./kakaomap";
import List from "./list";

const MapPage = () => {
  return (
    <div className="max-w-[1150px] mx-auto overflow-x-hidden ">
      <div className="w-[280px] mt-[35px]  ">
        검색어:없음 그냥 위치기반
      </div>
      <div className=" h-[580px] flex ">
        {/* <div className="w-[970px] h-full bg-yellow-500 border-solid border-2 border-yellow-500"></div> */}
        <KakaoMap />
        <List />
      </div>
    </div>
  );
};

export default MapPage;
