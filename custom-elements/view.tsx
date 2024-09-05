import { View } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeView: React.FC<React.ComponentProps<typeof View>> = ({
  className,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <View
      className={`${
        theme === "dark" ? "bg-background-dark" : "bg-background"
      } ${className || ""}`}
      {...props}
    />
  );
};

export default ThemeView;
