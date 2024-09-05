import React, { createContext } from "react";

export type MyContextType = {
  name: string;
  tableNo: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setTableNo: React.Dispatch<React.SetStateAction<string>>;
};

export const MyContext = createContext<MyContextType | any>({});
