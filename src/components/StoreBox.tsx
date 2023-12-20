import { StoreType } from "@/interface";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxType {
  store: StoreType;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxType) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-lg z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.bizcnd_code_nm
                      ? `/images/markers/${store.bizcnd_code_nm}.png`
                      : "/images/markers/default.png"
                  }
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                />
                <div>
                  <div className="font-semibold">{store.upso_nm}</div>
                  <div className="text-sm">{store.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="mt-2 flex gap-2 items-center font-semibold">
              <HiOutlineMapPin />
              {store.rdn_code_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center font-semibold">
              <AiOutlinePhone />
              {store.tel_no}
            </div>
            <div className="mt-2 flex gap-2 items-center font-semibold">
              <AiOutlineInfoCircle />
              {store.crtfc_gbn_nm}
            </div>
            <div className="mt-2 flex gap-2 items-center font-semibold">
              <AiOutlineCheck />
              {store.bizcnd_code_nm || '-'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.alert("상세보기 작업중")}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-md"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
