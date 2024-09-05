import { ReactNode } from "react";
import { Platform, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string | ReactNode;
  onPress: () => void;
  disabled?: boolean;
  theme?: string;
  style?: string;
}

export function BaseButton({ title, onPress, disabled, theme, style }: ButtonProps) {
  return (
    <TouchableOpacity
      className={`${style} rounded-lg border-2 border-primary bg-primary px-4 py-1.5 text-center font-medium text-sm text-text-dark hover:text-primary ${
        theme === "dark" ? "hover:bg-background-hover" : "hover:bg-background"
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      {Platform.OS === "web" ? (
        <span>{title}</span>
      ) : (
        <Text className="text-center text-text-dark font-semibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
