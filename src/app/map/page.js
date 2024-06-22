"use client";
import { useEffect, useState } from "react";
import KakaoMap from "./kakaomap";
import List from "./list";
const mockData = require("./mock.json");

const MapPage = () => {
  const [center, setCenter] = useState(null); // 지도 중심 좌표 상태
  const [hospitals, setHospitals] = useState([]); // 병원 정보 상태
  const [coordinates, setCoordinates] = useState([]); // 병원 좌표 상태
  const [keyword, setKeyword] = useState(""); // 검색 키워드 상태

  useEffect(() => {
    // 병원 정보를 가져오는 함수
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

    // 병원 좌표를 가져오는 함수
    const fetchCoordinates = async () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = async () => {
        window.kakao.maps.load(async () => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          // 병원의 주소를 좌표로 변환하는 함수
          const getCoordinates = async (hospital) => {
            return new Promise((resolve) => {
              geocoder.addressSearch(hospital.address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  resolve({
                    lat: result[0].y,
                    lng: result[0].x,
                    hospital,
                  });
                } else {
                  resolve(null);
                }
              });
            });
          };

          // 모든 병원의 좌표를 가져옴
          const coordinatesArray = await Promise.all(
            hospitals.map((hospital) => getCoordinates(hospital))
          );

          const validCoords = coordinatesArray.filter(
            (coord) => coord !== null
          );
          setCoordinates(validCoords);

          // 중심 좌표가 설정되지 않은 경우 첫 번째 병원의 좌표를 중심으로 설정
          if (!center && validCoords.length > 0) {
            setCenter(validCoords[0]);
          }
          //console.log("Coordinates:", validCoords);
        });
      };

      return () => {
        document.head.removeChild(kakaoMapScript);
      };
    };

    if (center) {
      //console.log(center, "1");
      // 카카오 맵 API 로드
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = () => {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          const coord = new window.kakao.maps.LatLng(center.lat, center.lng);

          // 현재 좌표를 주소로 변환
          geocoder.coord2Address(
            coord.getLng(),
            coord.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const newKeyword = result[0].address.region_1depth_name;
                //console.log(newKeyword);

                // 새 키워드가 이전 키워드와 다를 경우에만 상태 업데이트
                if (newKeyword !== keyword) {
                  setKeyword(newKeyword);
                  fetchHospitals(newKeyword);
                }

                // 병원 좌표를 가져오는 함수 호출
                fetchCoordinates();
              }
            }
          );
        });
      };

      return () => {
        document.head.removeChild(kakaoMapScript);
      };
    } else {
      // console.log("X");
      // 현재 위치를 가져와 center 상태로 설정
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCenter(location);
      });
    }
  }, [center, keyword]); // center와 keyword 상태가 변경될 때마다 실행

  return (
    <div className="w-full   mx-auto overflow-x-hidden ">
      <div className="w-[350px] mt-[35px]">
        현재 위치 기반입니다. 병원 클릭 시 이동합니다.
      </div>
      <div className=" h-[580px] flex ">
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
