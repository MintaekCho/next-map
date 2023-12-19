import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center fixed w-full h-[52px] top-0 shadow-[0 1px 2px 0 rgb(0 0 0 / 0.05)] bg-white">
      <h2 className="text-[darkblue] font-bold cursor-pointer py-0 px-6 text-lg">
        <Link href={"/"}>푸드맵</Link>
      </h2>
      <Navbar />
    </header>
  );
}
