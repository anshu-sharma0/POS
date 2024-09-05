import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";

const ThemeSafeAreaView: React.FC<React.ComponentProps<typeof SafeAreaView>> = ({
  className,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      className={`${
        theme === "dark" ? "bg-background-dark" : "bg-background"
      } ${className || ""}`}
      {...props}
    />
  );
};

export default ThemeSafeAreaView;
