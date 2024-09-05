import {
  View,
  Text,
  TouchableOpacity,
  Modal as RNModal,
  Platform,
} from "react-native";
import React, { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";
import { ThemeText, ThemeView } from "@/custom-elements";
import Cross from "@/assets/icons/cross";
import { BlurView } from "expo-blur";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme: string;
  style: string;
  title: string;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  theme,
  style,
  title,
}: ModalProps) => {
  const handleClose = (e: GestureResponderEvent) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <View className={`relative overflow-hidden shadow-md rounded-xl ${style}`}>
      <View
        className={`relative flex w-full flex-col overflow-hidden border shadow-lg outline-none focus:outline-none ${
          theme === "dark"
            ? "bg-background-dark border-border-dark"
            : "bg-background border-border"
        }`}
      >
        <View
          className={`relative flex flex-row items-start justify-between rounded-t p-5 ${
            theme === "dark" ? "border-border-dark" : "border-border"
          }`}
        >
          <ThemeText
            className={`w-full text-center text-xl font-semibold ${
              Platform.OS === "web" ? "mt-5" : "mt-0"
            }`}
          >
            {title}
          </ThemeText>
          <TouchableOpacity
            className={`absolute h-6 w-6 p-1 ${
              Platform.OS === "web" ? "right-5 top-5" : "right-2 top-2"
            }`}
            onPress={handleClose}
          >
            <Cross
              width={20}
              height={20}
              fill={theme === "dark" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
        <View className="relative flex-auto px-6 pt-2 pb-5">{children}</View>
      </View>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <>
        {isOpen && (
          <View className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <ThemeView className="fixed inset-0 bg-opacity-20 backdrop-blur backdrop-filter" />
            {modalContent}
          </View>
        )}
      </>
    );
  } else {
    return (
      <RNModal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <BlurView
          intensity={200}
          tint={theme === "dark" ? "dark" : "light"}
          className={`flex-1 items-center justify-center`}
        >
          <TouchableOpacity
            className="absolute inset-0"
            onPress={onClose}
            activeOpacity={1}
          />
          {modalContent}
        </BlurView>
      </RNModal>
    );
  }
};

export default Modal;
