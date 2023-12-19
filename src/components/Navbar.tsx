"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const NAV_LIST = [
    {
      url: "/stores",
      title: "맛집 목록",
    },
    {
      url: "/stores/new",
      title: "맛집 등록",
    },
    {
      url: "/users/likes",
      title: "찜한 가게",
    },
    {
      url: "/users/login",
      title: "로그인",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => setIsOpen((prev) => !prev);

  const LIST_ITEM_STYLES = `hover:text-[darkgray]`;

  return (
    <div>
      <div className="hidden sm:flex gap-4 px-6 py-0 font-bold">
        {NAV_LIST.map((item, i) => (
          <Link key={i} className={`${LIST_ITEM_STYLES}`} href={item.url}>
            {item.title}
          </Link>
        ))}
      </div>
      <button className="sm:hidden" onClick={handleChange}>
        {isOpen ? <AiOutlineClose /> : <BiMenu />}
      </button>
      {isOpen && (
        <div className="sm:hidden w-full h-screen flex flex-col gap-4 fixed left-0 px-6 py-8 font-bold text-white bg-[darkblue]">
          {NAV_LIST.map((item, i) => (
            <Link key={i} className={`${LIST_ITEM_STYLES}`} href={item.url}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
