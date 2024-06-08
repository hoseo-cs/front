"use client";
import { useEffect, useState } from "react";
import KakaoMap from "./kakaomap";
import List from "./list";
const mockData = require("./mock.json");

const MapPage = () => {
  const [center, setCenter] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  let keyword = "";
  useEffect(() => {
    const fetchHospitals = (keyword) => {
      try {
        const filteredData = mockData.filter((hospital) =>
          hospital.region.includes(keyword)
        );
        setHospitals(filteredData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

    if (center) {
      console.log(center, "1");
      // 카카오 맵 API 로드
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(kakaoMapScript);
      //카카오맵을 통해 현재 경도 위도를 주소로 변환
      kakaoMapScript.onload = () => {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          const coord = new window.kakao.maps.LatLng(center.lat, center.lng);
          geocoder.coord2Address(
            coord.getLng(),
            coord.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                keyword = result[0].address.region_1depth_name;
                console.log(keyword);
                fetchHospitals(keyword);
              }
            }
          );
        });
      };
      //변환 후 키워드를 통해 병원 정보를 가져옴
      console.log(keyword, "!s");
    } else {
      console.log("X");
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCenter(location);
      });
    }
  }, [center]);

  return (
    <div className="max-w-[1150px] mx-auto overflow-x-hidden ">
      <div className="w-[280px] mt-[35px]  ">검색어:없음 그냥 위치기반</div>
      <div className=" h-[580px] flex ">
        {/* <div className="w-[970px] h-full bg-yellow-500 border-solid border-2 border-yellow-500"></div> */}
        {center && <KakaoMap center={center} coordinates={coordinates} />}
        <List
          hospitals={hospitals}
          setCenter={setCenter}
          coordinates={coordinates}
        />
      </div>
    </div>
  );
};

export default MapPage;
