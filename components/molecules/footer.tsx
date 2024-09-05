import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

interface footerProps {
  voidKot: () => void;
  theme: string;
}

function Footer({ voidKot, theme }: footerProps) {
  const data = [
    { title: "Void Kot", onPress: voidKot },
    { title: "Complimentary" },
    { title: "Settlement" },
    { title: "Void Bill" },
    { title: "View Sale" },
    { title: "Shift Table" },
    { title: "Shift Item" },
  ];

  return (
    <>
      {Platform.OS === "web" ? (
        <View
          className={`fixed bottom-0 z-[100] mr-40 flex h-16 w-full flex-row items-center justify-between overflow-x-auto px-2 shadow-sm md:px-4 md:pr-2 xl:px-5 xl:pl-[110px] ${
            theme === "dark"
              ? "bg-background-table-card-dark"
              : "bg-background-footer"
          }`}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item?.onPress}
              className={`mx-2 w-full min-w-[140px] max-w-[160px] rounded-lg border-2 border-primary bg-primary px-4 py-2 text-center font-medium text-sm text-text-dark hover:text-primary md:min-w-[130px] md:max-w-[180px] xl:max-w-[235px] ${
                theme === "dark"
                  ? "hover:bg-background-hover"
                  : "hover:bg-background"
              }`}
            >
              <span className="text-sm md:text-base font-semibold">
                {item.title}
              </span>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingRight: 150,
          }}
          className={`fixed -bottom-6 md:bottom-0 z-[100] mr-40 flex h-16 w-full overflow-x-auto px-2 shadow-sm md:px-4 md:pr-2 xl:px-8 xl:pl-[100px] ${
            theme === "dark"
              ? "bg-background-table-card-dark"
              : "bg-background-footer"
          }`}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="mx-2 w-full min-w-[140px] max-w-[160px] rounded-lg border-2 border-primary bg-primary px-4 py-2 text-center font-medium text-text-dark md:min-w-[130px] md:max-w-[180px] xl:max-w-[240px]"
              onPress={item?.onPress}
            >
              <Text className="text-center text-text-dark text-sm font-semibold">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
}

export default Footer;
