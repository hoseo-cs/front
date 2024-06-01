"use client";
import { useEffect } from "react";

const KakaoMap = ({ center, coordinates = [] }) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng), // 중심 좌표를 center로 설정
          level: 3,
        };

        // 지도 띄우기
        const mapInstance = new window.kakao.maps.Map(container, options);

        // 마커 이미지의 이미지 주소입니다
        const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        coordinates.forEach((coord) => {
          // 마커 이미지의 이미지 크기 입니다
          const imageSize = new window.kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다
          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize
          );

          // 마커를 생성합니다
          new window.kakao.maps.Marker({
            map: mapInstance, // 마커를 표시할 지도
            position: new window.kakao.maps.LatLng(coord.lat, coord.lng), // 마커를 표시할 위치
            image: markerImage, // 마커 이미지
          });
        });

        // 중심 좌표가 변경될 때 지도의 중심을 업데이트합니다.
        return () => {
          if (center) {
            mapInstance.setCenter(
              new window.kakao.maps.LatLng(center.lat, center.lng)
            );
          }
        };
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
      document.head.removeChild(kakaoMapScript);
    };
  }, [center, coordinates]);

  return <div id="map" className="w-[970px] h-[580px]"></div>;
};

export default KakaoMap;
