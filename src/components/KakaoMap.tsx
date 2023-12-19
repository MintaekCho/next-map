"use client";

/*global kakao*/
import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

type StoreDataType = { x_cnts: string; y_dnts: string, bizcnd_code_nm: string }

export default function KakaoMap() {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT;
  const DEFAULT_LAT = 37.497625203;
  const DEFAULT_LNG = 127.03088379;

  const loadKakaoMap = () => {
    window.kakao.maps.load(async () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const data = await fetch("/data/store_data.json").then((res) =>
        res.json()
      );
      //지도 마커 생성
      data?.DATA?.map((store: StoreDataType) => {
        const x = store.x_cnts;
        const y = store.y_dnts;

        const imageSrc = store?.bizcnd_code_nm ? `/images/markers/${store.bizcnd_code_nm}.png` : '/images/markers/default.png'; // 마커이미지의 주소입니다
        const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markerPosition = new window.kakao.maps.LatLng(y, x);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
    });
  };
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen "></div>
    </>
  );
}
