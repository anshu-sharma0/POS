import { View, TouchableOpacity, Platform, ScrollView } from "react-native";
import { Image } from "expo-image";
import { BaseButton } from "../atoms/base-button";
import { router, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/hooks/useTheme";
import { ThemeText } from "@/custom-elements";

type headerProps = {
  setOpenSidebar: (isOpen: boolean) => void;
  openSidebar: boolean;
  tableNumber?: string;
};

const Header = ({ setOpenSidebar, openSidebar, tableNumber }: headerProps) => {
  const path = usePathname();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      if (Platform.OS === "web") {
        localStorage.clear();
      } else {
        await AsyncStorage.clear();
      }
      router.push("/");
    } catch (e) {
      console.error("Error clearing AsyncStorage:", e);
    }
  };

  return (
    <View
      className={`fixed top-0 z-[100] flex h-16 w-full flex-row items-center justify-between border-b px-8 pr-3.5 shadow-sm md:pr-2 ${
        theme === "dark"
          ? "border-border-dark bg-background-dark"
          : "border-border bg-background"
      }`}
    >
      <View className="flex cursor-pointer items-center pl-3 xl:pl-0">
        <TouchableOpacity
          className="absolute -left-4 z-[200] top-3 md:top-5 xl:hidden"
          onPress={() => setOpenSidebar(!openSidebar)}
        >
          {openSidebar ? (
            <ThemeText className="font-semibold">{"X"}</ThemeText>
          ) : (
            <ThemeText className="font-semibold">{"☰"}</ThemeText>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/dashboard")}>
          <Image
            source={require("@/assets/images/ic_mobe.png")}
            alt="logo"
            style={{ width: 25, height: 50 }}
            contentFit="fill"
          />
        </TouchableOpacity>
      </View>

      {tableNumber?.length ? (
        <View className="hidden md:flex flex-row items-center justify-center">
          <ThemeText className="text-base font-medium mr-2">
            Table No:
          </ThemeText>
          <ThemeText className="text-base font-semibold !text-primary mt-0.5">
            {tableNumber}
          </ThemeText>
        </View>
      ) : null}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: Platform.OS === "web" ? 1 : 0,
          justifyContent: Platform.OS === "web" ? "flex-end" : "center",
          flexDirection: "row",
        }}
        className="max-w-[250px] overflow-x-auto sm:max-w-[410px] sm:overflow-x-hidden sm:pl-0"
      >
        <View className="mx-2">
          <BaseButton onPress={handleLogout} title="Logout" theme={theme} />
        </View>
        <View className="mx-2">
          <BaseButton
            onPress={() => console.log("first")}
            title="Day Close"
            theme={theme}
          />
        </View>
        {path === "/dashboard" && (
          <View className="mx-2">
            <BaseButton
              onPress={() => console.log("first")}
              title="More Menu"
              theme={theme}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => toggleTheme()}
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-700/10"
          }`}
        >
          <Image
            source={
              theme === "dark"
                ? require("@/assets/images/sun.png")
                : require("@/assets/images/half-moon.png")
            }
            className="h-5 w-5"
            alt="logo"
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Header;
