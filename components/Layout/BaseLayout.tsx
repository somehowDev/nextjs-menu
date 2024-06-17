"use client";

import { useContext, useEffect } from "react";
import { SidebarContext } from "@/provider/SidebarProvider";
import {
  BiBuildingHouse,
  BiLeftArrowAlt,
  BiSpreadsheet,
  BiRightArrowAlt,
} from "react-icons/bi";
import Link from "next/link";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const { isCollapsed, toggleSidebarcollapse, toggleSidebarChangeName } =
    useContext(SidebarContext);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && isCollapsed === false)
        toggleSidebarcollapse(true);

      if (window.innerWidth > 768) toggleSidebarcollapse(false);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen ">
      <div
        className={`${
          isCollapsed ? "w-[120px]" : "w-[240px]"
        } flex flex-col transition-all duration-300 p-4 `}
      >
        <div className="flex items-center justify-between bg-white h-[60px] rounded-t-3xl  text-black ">
          <div className="pl-4 cursor-pointer">
            <Link
              className={``}
              href={"/"}
              onClick={() => {
                toggleSidebarChangeName("홈");
              }}
            >
              logo{" "}
            </Link>
          </div>
          <div
            className="cursor-pointer pr-4"
            onClick={() => {
              toggleSidebarcollapse(!isCollapsed);
            }}
          >
            {isCollapsed ? <BiRightArrowAlt /> : <BiLeftArrowAlt />}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto bg-white rounded-b-3xl text-black">
          <ul className="pt-8">
            <Link
              className={``}
              href={"/menu1"}
              onClick={() => {
                toggleSidebarChangeName("교과 콘텐츠");
              }}
            >
              <li
                className={`mb-4 flex items-center gap-2 cursor-pointer ${
                  isCollapsed ? "justify-center text-xl" : "pl-4"
                }`}
              >
                <BiBuildingHouse />
                <span className={`${isCollapsed ? "hidden" : "block"}`}>
                  메뉴 1
                </span>
              </li>
            </Link>
            <Link
              className={``}
              href={"/menu2"}
              onClick={() => {
                toggleSidebarChangeName("히스토리");
              }}
            >
              <li
                className={`mb-4 flex items-center gap-2 cursor-pointer ${
                  isCollapsed ? "justify-center text-xl" : "pl-4"
                }`}
              >
                <BiSpreadsheet />
                <span className={`${isCollapsed ? "hidden" : "block"}`}>
                  메뉴 2
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex-grow flex flex-col h-screen bg-[#1A1C1E] p-4">
        <div className="bg-[#F1F3F4] flex-grow overflow-auto rounded-3xl p-6 text-[#1A1C1E]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
