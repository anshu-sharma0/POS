import React, { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Product, SelectedProduct, Table } from "@/types";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SearchIcon from "@/assets/icons/search";
import { ThemeInput, ThemeText } from "@/custom-elements";

const formSchema = z.object({
  search: z.string(),
});

interface props {
  showSuggestions?: boolean;
  search: string;
  searchLabel?: string;
  searchResult: Product[];
  setSearch: (search: string) => void;
  setSelectedProduct: (product: SelectedProduct) => void;
  selectedTable?: Table | null;
  theme: string;
  productsList: SelectedProduct[];
}

const SearchBar = (props: props) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const resultContainerRef = useRef<View | null>(null);

  const {
    showSuggestions = true,
    search,
    setSearch,
    searchResult = [],
    setSelectedProduct,
    searchLabel = "Search items",
    selectedTable,
    theme,
    productsList,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const shouldShowSuggestions = search && showSuggestions;

  useEffect(() => {
    if (search) {
      setSelectedOptionIndex(-1);
    }
  }, [search]);

  return (
    <View className="relative z-[400]">
      <View className="absolute right-2 top-2.5">
        <SearchIcon />
      </View>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <View className="relative">
              <View className="absolute right-2 top-2.5">
                <SearchIcon />
              </View>
              <ThemeInput
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setSearch(text);
                }}
                value={value}
                className="w-full rounded-md border py-2.5 pl-2.5 pr-8 outline-none focus:border-primary"
                placeholderTextColor="gray"
                placeholder="Search items"
              />
            </View>

            {shouldShowSuggestions ? (
              <ScrollView
                className={`absolute min-h-max z-[500] max-h-40 top-[40px] right-0 p-5 w-full rounded-md shadow border overflow-y-auto ${
                  theme === "dark"
                    ? "border-border-dark bg-background-dark"
                    : "border-border bg-background"
                }`}
              >
                {searchResult?.length ? (
                  searchResult?.map((list: Product, index: number) => (
                    <TouchableOpacity
                      key={index}
                      className={`text-primary my-1 text-xsmall cursor-pointer ${
                        selectedOptionIndex === index
                          ? "bg-orange text-primary"
                          : ""
                      }`}
                      onPress={() => {
                        const sameItem = productsList.filter(
                          (item) => item.id === list.id
                        );
                        if (sameItem.length) {
                          setValue("search", "");
                          setSearch("");
                        } else {
                          setValue("search", "");
                          setSearch("");
                          setSelectedProduct({ ...list, quantity: 1 });
                        }
                      }}
                    >
                      <ThemeText className="font-regular">
                        {list.name}
                      </ThemeText>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View className="p-1 w-full h-full">
                    <View className="flex items-center justify-center w-full h-full rounded-md">
                      <ThemeText className="font-regular">
                        No data found.
                      </ThemeText>
                    </View>
                  </View>
                )}
              </ScrollView>
            ) : null}
          </View>
        )}
        name="search"
      />
    </View>
  );
};

export default SearchBar;
