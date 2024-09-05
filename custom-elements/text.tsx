import { Text } from "react-native";
import React from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeText: React.FC<React.ComponentProps<typeof Text>> = ({
  className,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <Text
      className={`${theme === "dark" ? "text-text" : "text-text-dark"} ${
        className || ""
      }`}
      {...props}
    />
  );
};

export default ThemeText;
