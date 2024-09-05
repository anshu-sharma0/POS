import { Text, TouchableOpacity } from "react-native";
import BackIcon from "@/assets/icons/back";

interface IBackBtnProps {
  onPress: () => void;
}

export default function TableBackBtn({ onPress }: IBackBtnProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute flex-row items-center left-0 md:left-2 lg:left-5 top-8"
    >
      <BackIcon />
      <Text className="text-xl hidden 2xl:block font-medium text-primary ml-2">
        Back
      </Text>
    </TouchableOpacity>
  );
}
