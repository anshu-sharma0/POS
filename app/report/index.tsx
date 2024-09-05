import { View, Text, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import Header from "@/components/molecules/header";
import Sidebar from "@/components/molecules/sidebar";
import { useTheme } from "@/hooks/useTheme";
import { ThemeSafeAreaView, ThemeText, ThemeView } from "@/custom-elements";

const ReportScreen = () => {
  const { theme } = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <ThemeSafeAreaView
      style={{
        flex: Platform.OS !== "web" ? 0 : 1,
      }}
      className="relative h-full w-full"
    >
      <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
      <ThemeView className="flex min-h-[calc(100vh-64px)] w-full flex-col sm:mt-16 sm:flex-row">
        <Sidebar
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
          theme={theme}
        />
        <ThemeView className="flex-grow justify-center overflow-hidden xl:pl-[100px] pt-0 h-[80vh] md:pt-5">
          <ThemeText className="text-xl font-semibold text-center">
            Coming soon..
          </ThemeText>
        </ThemeView>
      </ThemeView>
    </ThemeSafeAreaView>
  );
};

export default ReportScreen;
