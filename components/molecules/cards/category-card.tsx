import { ThemeText } from "@/custom-elements";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ITabCardProps {
  onPress: () => void;
  name: string;
  theme: string;
}

export default function CategoryCard({
  onPress,
  name,
  theme,
}: ITabCardProps) {
  return (
    <TouchableOpacity
      className={`m-2 flex h-fit min-h-[100px] min-w-[140px] shadow cursor-pointer items-center justify-center rounded-lg border p-3 lg:w-[200px] 2xl:w-[230px] ${
        theme === "dark" ? "border-border-dark" : "border-border"
      }`}
      onPress={onPress}
    >
      <ThemeText className="flex w-[130px] items-center justify-center break-words overflow-y-hidden text-center font-medium uppercase lg:w-[190px] 2xl:w-[220px] text-sm lg:text-xl">
        {name}
      </ThemeText>
    </TouchableOpacity>
  );
}
