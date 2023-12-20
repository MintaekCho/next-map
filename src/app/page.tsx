"use client";
import KakaoMap from "@/components/KakaoMap";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";
import { useEffect, useState } from "react";

async function getStoreData() {
  const res = await fetch("/data/store_data.json")
  return res.json();
}

export default function Home() {
  const [storeData, setStoreData] = useState<StoreType[]>([]);
  const [map, setMap] = useState<any>(null);
  const [currentStore, setCurrentStore] = useState<any>(null);

  useEffect(() => {
    fetch("/data/store_data.json")
      .then((res) => res.json())
      .then((data) => {
        setStoreData(data.DATA);
      });
  }, []);

  const handleSetMap = (map: any) => setMap(map);

  return (
    <main>
      <KakaoMap handleSetMap={handleSetMap} />
      <Markers
        map={map}
        storeDatas={storeData}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </main>
  );
}
