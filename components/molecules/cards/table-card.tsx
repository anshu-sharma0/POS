import { View, TouchableOpacity, Text } from "react-native";
import { ITableItem } from "@/pages/dashboard/type";
import { ThemeText } from "@/custom-elements";

interface ITableProps {
  data: ITableItem;
  onPress: () => void;
  theme: string;
}

export default function TableCard({ data, onPress, theme }: ITableProps) {
  return (
    <TouchableOpacity
      className={`m-2 flex h-[80px] w-[130px] cursor-pointer items-center justify-center overflow-hidden shadow rounded-lg border p-1 md:h-[100px] md:w-[220px] md:min-w-[200px]
      ${
        theme === "dark"
          ? !data?.isBillPrinted && data?.status === "OCCUPIED"
            ? "border-primary bg-background-dark"
            : data?.isBillPrinted
            ? "border-background-billed-dark bg-background-billed-dark"
            : "border-border-dark bg-background-dark"
          : !data?.isBillPrinted && data?.status === "OCCUPIED"
          ? "border-primary bg-background"
          : data?.isBillPrinted
          ? "border-background-billed bg-background-billed"
          : "border-border bg-background"
      }
      `}
      onPress={onPress}
    >
      <View className="flex h-full w-full flex-row items-center justify-center">
        <ThemeText
          className={`md:text-xsmall w-[50%] text-center text-lg font-medium md:text-[24px] ${
            data?.isBillPrinted && "!text-text-billed"
          }`}
        >
          {data?.code}
        </ThemeText>
        <View
          className={`flex h-full w-[50%] items-center justify-center rounded-md ${
            theme === "dark"
              ? "bg-background-table-card-dark"
              : "bg-background-table-card"
          }`}
        >
          <ThemeText className="text-center font-regular text-sm md:text-base">
            {data?.isBillPrinted
              ? "Billed"
              : data?.status === "OCCUPIED"
              ? "Taken"
              : ""}
          </ThemeText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
