import { StoreType } from "@/interface";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkerProps {
  map: any;
  storeDatas: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<StoreType>>
}

export default function Markers({ map, storeDatas, setCurrentStore }: MarkerProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      //지도 마커 생성
      storeDatas?.map((store: StoreType) => {
        const x = store.x_cnts;
        const y = store.y_dnts;

        const imageSrc = store?.bizcnd_code_nm
          ? `/images/markers/${store.bizcnd_code_nm}.png`
          : "/images/markers/default.png"; // 마커이미지의 주소입니다
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

        //마커 커서가 오버되었을 때 마커 위에 표시할 인포윈도우 생성
        const content = `<div class="infowindow">${store.upso_nm}</div>`;
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커 위에 인포윈도우를 표시합니다
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커 위에 인포윈도우를 표시합니다
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function() {
            setCurrentStore(store)
        })
      });
    }
  }, [map, setCurrentStore, storeDatas]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);
  return <></>;
}
