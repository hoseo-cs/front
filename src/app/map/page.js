"use client";
import { useEffect, useState } from "react";
import SearchBar from "../components/searchBar";
import KakaoMap from "./kakaomap";
import List from "./list";
const mockData = require("./mock.json");

const MapPage = () => {
  const [center, setCenter] = useState(null); // 지도 중심 좌표 상태
  const [hospitals, setHospitals] = useState([]); // 병원 정보 상태
  const [coordinates, setCoordinates] = useState([]); // 병원 좌표 상태
  const [keyword, setKeyword] = useState(""); // 검색 키워드 상태
  const [showList, setShowList] = useState(true); // 리스트 표시 상태

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
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-5rem)] overflow-hidden">
      <div className="w-full md:w-96 p-4 bg-white shadow-lg flex-shrink-0">
        <SearchBar setShowList={setShowList} />
        <List
          hospitals={hospitals}
          setCenter={setCenter}
          coordinates={coordinates}
        />
      </div>
      <div className="flex-1 relative">
        {center && <KakaoMap center={center} coordinates={coordinates} />}
        <div
          className={`absolute top-0 left-0 w-full h-full bg-white z-10 transform ${
            showList ? "translate-y-0" : "translate-y-full"
          } transition-transform duration-300 md:hidden`}
        >
          <List
            hospitals={hospitals}
            setCenter={setCenter}
            coordinates={coordinates}
          />
          <button
            onClick={() => setShowList(false)}
            className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
