import { useEffect, useMemo, useState } from "react";
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
import { ThemeInput, ThemeText } from "@/custom-elements";
import Modal from "./modal";
import { BaseButton } from "../atoms/base-button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type BillTableProps = {
  productsList: SelectedProduct[];
  billProductsForTable: SelectedProduct[];
  setProductsList: (productsList: SelectedProduct[]) => void;
  setSelectedProduct: (product: SelectedProduct) => void;
  selectedProduct: SelectedProduct | null;
  refetchBillInfo: () => void;
  theme: string;
};

const formSchema = z.object({
  modifier: z.string().nonempty({
    message: "Table no is required",
  }),
});
const DEFAULT_BILLING_TABLE_LENGTH = 14;

export default function BillTable(props: BillTableProps) {
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

  const openModal = () => setOpenModifierModal(true);
  const closeModal = () => {
    setOpenModifierModal(false);
    setItemId("");
    setValue("modifier", "");
  };

  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modifier: "",
    },
  });

  const { modifier } = watch();

  function onSubmit() {
    if (itemId && productsList.length && modifier) {
      const index = productsList.findIndex(
        (item: SelectedProduct) => item?.id === itemId
      );

      if (index !== -1) {
        const updatedItem = {
          ...productsList[index],
          modifier: modifier,
        };
        const updatedProductsList = [...productsList];
        updatedProductsList[index] = updatedItem;
        setProductsList(updatedProductsList);
        setOpenModifierModal(false);
        setValue("modifier", "");
        setItemId("");
      }
    }
    refetchBillInfo();
  }

  useEffect(() => {
    if (selectedProduct) {
      const listItem = [selectedProduct, ...productsList];
      setProductsList(listItem);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (itemId && productsList) {
      const filteredItem = productsList.filter(
        (item: SelectedProduct) => item?.id === itemId
      );

      if (filteredItem) {
        setValue("modifier", filteredItem[0]?.modifier as string);
      }
    }
  }, [itemId, productsList]);

  return (
    <View
      className={`relative z-[300] mt-5 mb-2 h-[58vh] w-full rounded-md border shadow ${
        theme === "dark" ? "border-border-dark" : "border-border"
      }`}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      >
        <View>
          <View
            className={`sticky top-0 z-10 flex flex-row border-b overflow-hidden p-2 ${
              theme === "dark"
                ? "bg-background-dark border-border-dark"
                : "bg-background border-border"
            }`}
          >
            <Text className="w-[38px] text-center font-medium text-text-grey">
              S.No
            </Text>
            <Text className="w-[210px] text-center font-medium text-text-grey">
              Item Name
            </Text>
            <Text className="w-[100px] text-center font-medium text-text-grey">
              Qty
            </Text>
            <Text className="w-[60px] text-center font-medium text-text-grey">
              Rate
            </Text>
            <Text className="w-[100px] text-center font-medium text-text-grey">
              Amount
            </Text>
            <Text className="w-[60px] md:w-[70px] text-center font-medium text-text-grey">
              Modifier
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, zIndex: 100 }}
            nestedScrollEnabled={true}
            scrollEnabled={true}
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
                  className={`first-letter flex w-full flex-row border-b px-2 py-1.5 ${
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
                  <ThemeText className="w-[38px] text-center font-medium">
                    {index + 1}
                  </ThemeText>
                  <TouchableOpacity
                    onPress={() =>
                      hasValue
                        ? setSelectedProduct(product as SelectedProduct)
                        : null
                    }
                    className="w-[210px] flex justify-center"
                  >
                    <ThemeText className="text-center uppercase font-regular">
                      {product?.name}
                    </ThemeText>
                  </TouchableOpacity>
                  <View className="flex w-[100px] flex-row items-center justify-center text-center font-medium">
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
                      <ThemeText className="px-2 text-center leading-4 font-regular">
                        {product?.quantity}
                      </ThemeText>
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
                  <ThemeText className="flex w-[60px] items-center justify-center text-center font-regular">
                    {product?.price || ""}
                  </ThemeText>
                  <ThemeText className="flex w-[100px] items-center justify-center text-center font-regular">
                    {totalProductAmount || ""}
                  </ThemeText>
                  <View className="flex w-[60px] md:w-[70px] items-center justify-center text-center">
                    {hasValue && (
                      <TouchableOpacity
                        onPress={() => {
                          openModal();
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
      <Modal
        isOpen={openModifierModal}
        onClose={closeModal}
        theme={theme}
        style="max-h-[90vh] w-[80vw] xl:w-[30vw] 2xl:w-[25vw]"
        title="Add Modifier"
      >
        <View className="mb-2">
          <ThemeText className="text-sm font-medium mb-0.5">
            Add Modifier:
          </ThemeText>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemeInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className={`mt-1 w-full rounded-md border-2 font-regular p-2.5 outline-none focus:border-primary ${
                    theme === "dark" ? "border-border-dark" : "border-border"
                  }`}
                  placeholderTextColor="gray"
                  placeholder="Type your modifier here..."
                  multiline={true}
                  numberOfLines={3}
                  style={{ textAlignVertical: "top" }}
                />
              )}
              name="modifier"
            />
          </View>
          <BaseButton
            title="Submit"
            theme={theme}
            onPress={handleSubmit(onSubmit)}
            style="w-fit ml-auto px-10 mt-3"
          />
        </View>
      </Modal>
    </View>
  );
}
