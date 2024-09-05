import React, { useContext, useEffect, useState } from "react";
import * as z from "zod";
import {
  Billing,
  Category,
  SelectedProduct,
  SelectedProductFormInfoType,
  Subcategory,
  Table,
  host,
} from "@/types";
import { SelectedProductFormInfoSchema } from "@/constants/home-form-schema";
import { Controller, UseFormReturn } from "react-hook-form";
import { MyContext } from "@/context/context";
import { ThemeInput } from "@/custom-elements";
import { View } from "react-native";

type formInfo = {
  billForTableCode: Billing | undefined;
  selectedTable: Table | null;
  selectedCategory: Category | null;
  selectedSubCategory: Subcategory | null;
  selectedProduct: SelectedProduct | null;
};
interface props {
  handleProductListModifier: (modifier: string) => void;
  selectedProductFormRef: UseFormReturn<SelectedProductFormInfoType | any>;
  formInfo: formInfo;
  setSelectedProduct: (product: SelectedProduct) => void;
  productsList: SelectedProduct[];
  setProductsList: (productsList: SelectedProduct[]) => void;
  selectedItemModifier?: SelectedProduct | null;
  setCustomerId: (e: string) => void;
  hostForTableCode: host;
}

const StewardNumberForm = (props: props) => {
  const { billForTableCode, selectedTable } = props.formInfo;
  const { setCustomerId, hostForTableCode } = props;
  const [isTableNoFilled, setIsTableNoFilled] = useState<boolean>(false);
  const { setName, setTableNo } = useContext(MyContext);

  const { selectedProductFormRef: form, selectedItemModifier } = props;

  const { code: tableNo } = (selectedTable as Table) || {};

  useEffect(() => {
    form.setValue("tableNo", tableNo);
    setTableNo(tableNo);
    setIsTableNoFilled(!!tableNo);
  }, [props.formInfo]);

  useEffect(() => {
    if (hostForTableCode?.name) {
      form.setValue("name", hostForTableCode?.name);
      setName(hostForTableCode?.name);
      form.setValue("mobileNo", hostForTableCode?.phone);
    }
    setCustomerId(hostForTableCode?.id);
  }, [hostForTableCode]);

  useEffect(() => {
    if (selectedTable) {
      form.setValue("modifier", "");
    }
  }, [selectedTable]);

  function onSubmit(values: z.infer<typeof SelectedProductFormInfoSchema>) {
    console.debug("homeValue");
  }
  const selectProductionFormErrors = form?.formState?.errors;

  return (
    <View>
      <View className="flex items-center">
        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemeInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="mt-4 w-full rounded-md border p-2.5 outline-none focus:border-primary"
              placeholderTextColor="gray"
              placeholder="Enter steward number"
            />
          )}
          name="stewardNo"
        />
      </View>
    </View>
  );
};

export default StewardNumberForm;
