"use client";

import { StoreType } from "@/interface";
/*global kakao*/
import Script from "next/script";
import React from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  handleSetMap: (map: any) => void;
}


export default function KakaoMap({handleSetMap}: Props) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT;
  const DEFAULT_LAT = 37.497625203;
  const DEFAULT_LNG = 127.03088379;

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      handleSetMap(map)
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
