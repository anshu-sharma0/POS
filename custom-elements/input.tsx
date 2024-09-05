import { TextInput, TextInputProps } from "react-native";
import React, { forwardRef } from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeInput = forwardRef<
  TextInput,
  TextInputProps & { className?: string }
>(({ className, ...props }, ref) => {
  const { theme } = useTheme();
  return (
    <TextInput
      ref={ref}
      className={`${
        theme === "dark"
          ? "text-text border-border-dark"
          : "text-text-dark border-border"
      } ${className || ""}`}
      {...props}
    />
  );
});

ThemeInput.displayName = "ThemeInput";

export default ThemeInput;
