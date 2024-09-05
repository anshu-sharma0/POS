import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ITabBarProps {
  data: any[];
  activeTab: number;
  setActiveTab: (tab: number) => void;
  setSelectedTypeData: (data: any) => void;
  theme: string;
}

export default function TabBarHeader({
  data,
  activeTab,
  setActiveTab,
  setSelectedTypeData,
  theme,
}: ITabBarProps) {
  return (
    <View
      className={`flex h-12 w-[90%] lg:w-[70%] shadow flex-row items-center justify-center overflow-hidden rounded-lg px-1 ${
        theme === "dark"
          ? "bg-background-table-card-dark"
          : "bg-background-table-card"
      }`}
    >
      {data.length
        ? data.map((tab: any, index: number) => (
            <TouchableOpacity
              key={tab?.id}
              className={`flex h-8 w-[33%] justify-center rounded-md ${
                activeTab === index
                  ? theme === "dark"
                    ? "bg-background-dark shadow"
                    : "bg-background shadow"
                  : ""
              }`}
              onPress={() => {
                setActiveTab(index);
                setSelectedTypeData([]);
              }}
            >
              <Text
                className={`text-center font-medium text-xs xl:text-base uppercase ${
                  activeTab === index
                    ? theme === "dark"
                      ? "text-text"
                      : "text-text-dark"
                    : "text-text-grey"
                }`}
              >
                {tab?.name}
              </Text>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
}
