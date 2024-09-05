import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { Image } from "expo-image";
import { router, usePathname } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ThemeText, ThemeView } from "@/custom-elements";
import SecureUser from "@/assets/icons/secure-user";

type routeValue = {
  title: string;
  route: string;
};

type sidebarProps = {
  setOpenSidebar?: (isOpen: boolean) => void;
  openSidebar: boolean;
  theme: "light" | "dark";
};

function Sidebar({ openSidebar, setOpenSidebar, theme }: sidebarProps) {
  const path = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const sidebarData = [
    { title: "table", route: "/dashboard" },
    { title: "master", route: "/master" },
    { title: "report", route: "/report" },
    { title: "host", route: "/host" },
  ];

  useEffect(() => {
    const currentScreen = path;

    const title = currentScreen.slice(1);
    if (currentScreen === "/dashboard") {
      setActiveItem("table");
    } else {
      setActiveItem(title);
    }
  }, []);

  const handleRoute = (value: routeValue) => {
    router.push(value.route);
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      document.body.style.overflow = openSidebar ? "hidden" : "auto";
    }

    return () => {
      if (Platform.OS === "web") {
        document.body.style.overflow = "auto";
      }
    };
  }, [openSidebar]);

  return (
    <ThemeView
      className={`h-full w-[100px] border-r px-3 py-5 shadow-md xl:h-[calc(100vh-64px)]
      ${theme === "dark" ? "border-border-dark" : "border-border"}
        ${
          openSidebar
            ? Platform.OS === "web"
              ? "fixed left-0 top-[64px] z-[150] block"
              : "absolute left-0 top-0 z-[150] block"
            : "hidden xl:fixed xl:left-0 xl:top-[64px] xl:z-[150] xl:block"
        }
        `}
    >
      {sidebarData.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`mb-2 box-border flex w-full min-w-[75px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-2.5 md:p-3.5 capitalize hover:border-primary
                   ${
                     theme === "dark"
                       ? item.title === activeItem
                         ? "border-primary bg-background-dark"
                         : "border-border-dark bg-background-dark opacity-50"
                       : item.title === activeItem
                       ? "border-primary bg-background"
                       : "border-border bg-background opacity-50"
                   }
          `}
          onPress={() => handleRoute(item)}
        >
          <SecureUser
            width={16}
            height={16}
            fill={theme === "dark" ? "white" : "black"}
          />
          <ThemeText className="capitalize mt-1 text-sm md:text-base font-regular">{item.title}</ThemeText>
        </TouchableOpacity>
      ))}
    </ThemeView>
  );
}

export default Sidebar;
