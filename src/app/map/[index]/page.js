"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    <div className="max-w-[1150px] mx-auto overflow-x-hidden border-solid border-2 border-green-500">
      <div className="w-[280px] mt-[35px] border-solid border-2 border-sky-500">
        검색어: {decoded}
      </div>
      <div className="h-[580px] flex border-solid border-2 border-red-500">
        {coordinates.length > 0 && (
          <KakaoMap center={center} coordinates={coordinates} />
        )}
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
