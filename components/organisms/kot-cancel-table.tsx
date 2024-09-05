import { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import MessageIcon from "@/assets/icons/message";
import { SelectedProduct } from "@/types";
import MinusIcon from "@/assets/icons/minus";
import PlusIcon from "@/assets/icons/plus";
import { ThemeText } from "@/custom-elements";

type BillTableProps = {
  productsList: SelectedProduct[];
  billProductsForTable: SelectedProduct[];
  setProductsList: (productsList: SelectedProduct[]) => void;
  setSelectedProduct: (product: SelectedProduct) => void;
  selectedProduct: SelectedProduct | null;
  refetchBillInfo: () => void;
  theme: string;
};

const DEFAULT_BILLING_TABLE_LENGTH = 14;

export default function KotCancelTable(props: BillTableProps) {
  const {
    productsList = [],
    setProductsList,
    billProductsForTable = [],
    setSelectedProduct,
    refetchBillInfo,
    selectedProduct,
    theme,
  } = props;

  const [openModifierModal, setOpenModifierModal] = useState(false);
  const [itemId, setItemId] = useState("");

  const handleQuantityUpdate = (
    selectedProduct: SelectedProduct,
    action: number
  ) => {
    const list = [...productsList];

    const targetIndex = productsList?.findIndex(
      (product) => selectedProduct?.id == product?.id
    );

    const quantity = selectedProduct?.quantity + action;

    if (quantity < 1) return handleProductDelete(selectedProduct);

    if (targetIndex > -1) {
      list.splice(targetIndex, 1, { ...selectedProduct, quantity });
      setProductsList(list);
    }
  };

  const handleProductDelete = (selectedProduct: SelectedProduct) => {
    const list = [...productsList];
    const targetIndex = productsList?.findIndex(
      (product) => selectedProduct?.id == product?.id
    );

    if (targetIndex > -1) {
      list.splice(targetIndex, 1);
      setProductsList(list);
    }
  };

  const productListLength = productsList?.length;

  const tableDataArray = useMemo(() => {
    const needToAddDummyData = productListLength < DEFAULT_BILLING_TABLE_LENGTH;

    let dummyData: void[] = [];

    if (needToAddDummyData) {
      dummyData = new Array(DEFAULT_BILLING_TABLE_LENGTH - productListLength)
        .fill(null)
        .map(() => {});
    }

    const resultList = [...billProductsForTable, ...productsList]?.reverse();

    return needToAddDummyData ? [...resultList, ...dummyData] : resultList;
  }, [productsList, billProductsForTable, productListLength]);

  return (
    <View
      className={`relative z-[300] mt-5 mb-2 h-[40vh] w-full md:min-w-[780px] rounded-md border ${
        theme === "dark" ? "border-border-dark" : "border-border"
      }`}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      >
        <View className="w-full">
          <View
            className={`sticky top-0 z-10 flex flex-row border-b p-2 ${
              theme === "dark"
                ? "border-border-dark bg-background-dark"
                : "border-border bg-background"
            }`}
          >
            <View className="w-[8%] min-w-[40px] text-center font-medium text-text-grey"></View>
            <Text className="w-[15%] min-w-[100px] text-center font-medium text-text-grey">
              Table No.
            </Text>
            <Text className="w-[22%] min-w-[230px] text-center font-medium text-text-grey">
              Item Code
            </Text>
            <Text className="w-[20%] min-w-[210px] text-center font-medium text-text-grey">
              Item Description
            </Text>
            <Text className="w-[17%] min-w-[100px] text-center font-medium text-text-grey">
              Qty
            </Text>
            <Text className="w-[18%] min-w-[100px] text-center font-medium text-text-grey">
              Amount
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, zIndex: 100 }}
            nestedScrollEnabled={true}
            scrollEnabled={true}
            className="overflow-x-scroll"
          >
            {tableDataArray?.map((product, index) => {
              const totalProductAmount =
                Number(product?.price) * (product?.quantity || 1);
              const hasValue = product?.id && product?.isEditable !== false;

              const isItemShouldSelect =
                tableDataArray &&
                selectedProduct &&
                selectedProduct?.id === product?.id &&
                product?.isEditable !== false;
              return (
                <View
                  key={product?.id || index}
                  className={`first-letter flex w-full flex-row border-b px-2 py-1.5
                    ${
                      theme === "dark"
                        ? product?.id
                          ? "hover:bg-background-table-card-dark border-border-dark"
                          : "hover:bg-transparent border-border-dark"
                        : product?.id
                        ? "hover:bg-background-table-card border-border"
                        : "hover:bg-transparent border-border"
                    }
                 `}
                >
                  <ThemeText className="w-[8%] min-w-[45px] text-center font-medium">
                    {index + 1}
                  </ThemeText>
                  <TouchableOpacity
                    onPress={() =>
                      hasValue
                        ? setSelectedProduct(product as SelectedProduct)
                        : null
                    }
                    className="w-[15%] min-w-[100px] flex justify-center"
                  >
                    <ThemeText className="text-center uppercase">
                      {product?.name}
                    </ThemeText>
                  </TouchableOpacity>
                  <View className="flex w-[22%] min-w-[230px] flex-row items-center justify-center text-center font-medium">
                    {hasValue && (
                      <TouchableOpacity
                        onPress={() => handleQuantityUpdate(product, -1)}
                        className={`flex h-5 w-5 items-center justify-center overflow-hidden rounded border ${
                          theme === "dark" ? "border-text" : "border-text-dark"
                        }`}
                      >
                        <MinusIcon
                          width={14}
                          height={14}
                          stroke={theme === "dark" ? "white" : "black"}
                        />
                      </TouchableOpacity>
                    )}
                    {hasValue && (
                      <Text className="px-2 text-text">
                        {product?.quantity}
                      </Text>
                    )}
                    {hasValue && (
                      <TouchableOpacity
                        onPress={() => handleQuantityUpdate(product, 1)}
                        className={`flex h-5 w-5 items-center justify-center overflow-hidden rounded border ${
                          theme === "dark" ? "border-text" : "border-text-dark"
                        }`}
                      >
                        <PlusIcon
                          width={18}
                          height={18}
                          stroke={theme === "dark" ? "white" : "black"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <ThemeText className="flex w-[20%] min-w-[210px] items-center justify-center text-center font-medium">
                    {product?.price || ""}
                  </ThemeText>
                  <ThemeText className="flex w-[17%] min-w-[100px] items-center justify-center text-center font-medium">
                    {totalProductAmount || ""}
                  </ThemeText>
                  <View className="flex w-[18%] min-w-[100px] items-center justify-center text-center font-medium">
                    {hasValue && (
                      <TouchableOpacity
                        onPress={() => {
                          setOpenModifierModal(!openModifierModal);
                          setItemId(product?.id);
                        }}
                      >
                        <MessageIcon
                          width={18}
                          height={18}
                          stroke={theme === "dark" ? "white" : "black"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
