"use client";

import { createContext, useState, ReactNode, useContext } from "react";

// SidebarContext의 값에 대한 인터페이스 정의
interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebarcollapse: (collapse: boolean) => void;
  toggleSidebarChangeName: (name: string) => void;
  name: string;
}

// 초기 값에 대한 타입 명시
const initialValue: SidebarContextType = {
  isCollapsed: false,
  name: "",
  toggleSidebarcollapse: (collapse: boolean) => {},
  toggleSidebarChangeName: (name: string) => {},
};

// createContext의 제네릭을 사용하여 타입 지정
const SidebarContext = createContext<SidebarContextType>(initialValue);

// SidebarProvider의 props에 대한 인터페이스 정의
interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setCollapse] = useState<boolean>(false);
  const [name, setName] = useState<string>("홈");

  const toggleSidebarcollapse = (collapse: boolean) => {
    setCollapse(collapse);
  };

  const toggleSidebarChangeName = (name: string) => {
    setName(name);
  };
  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebarcollapse,
        name,
        toggleSidebarChangeName,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };
