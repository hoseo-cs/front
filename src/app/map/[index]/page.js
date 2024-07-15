"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../../components/searchBar";
import KakaoMap from "../kakaomap";
import List from "../list";

const mockData = require("./mock.json");

const MapPage = () => {
  const params = useParams();
  const decoded = decodeURIComponent(params.index);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState(null);
  const [showList, setShowList] = useState(true); // 리스트 표시 상태

  useEffect(() => {
    const fetchHospitals = () => {
      try {
        const filteredData = mockData.filter((hospital) =>
          hospital.region.includes(decoded)
        );
        setHospitals(filteredData);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, [decoded]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.onload = async () => {
        window.kakao.maps.load(async () => {
          const geocoder = new window.kakao.maps.services.Geocoder();

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

          const coordinatesArray = await Promise.all(
            hospitals.map((hospital) => getCoordinates(hospital))
          );

          const validCoords = coordinatesArray.filter(
            (coord) => coord !== null
          );
          setCoordinates(validCoords);
          setCenter(validCoords[0]); // 첫 번째 좌표를 중심으로 설정
          //console.log("Coordinates:", validCoords);
        });
      };

      return () => {
        document.head.removeChild(kakaoMapScript);
      };
    };

    if (hospitals.length > 0) {
      fetchCoordinates();
    }
  }, [hospitals]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
