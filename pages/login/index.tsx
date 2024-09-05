import { useState } from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BaseButton } from "@/components/atoms/base-button";
import { useForm, Controller } from "react-hook-form";
import { userLogin } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { IFormData } from "./type";
import { useTheme } from "@/hooks/useTheme";
import { ThemeText, ThemeSafeAreaView, ThemeInput } from "@/custom-elements";
import Eye from "@/assets/icons/eye";
import EyeOff from "@/assets/icons/eye-off";

const Login = () => {
  const { theme } = useTheme();
  const [loginError, setLoginError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IFormData) => {
    setIsLoading(true);
    try {
      const res = await userLogin(data);

      if (res?.status === 201) {
        if (Platform.OS === "web") {
          localStorage.setItem("accessToken", res?.data?.access_token);
        } else {
          try {
            await AsyncStorage.setItem("accessToken", res?.data?.access_token);
          } catch (e) {
            console.error("Error saving to AsyncStorage:", e);
            setLoginError("Get error on set local storage");
          }
        }

        setIsLoading(false);
        router.push("/dashboard");
        reset();
        setLoginError("");
      }
    } catch (err: any) {
      console.log(err, "err");
      setIsLoading(false);
      if (err?.response?.status === 401) {
        setLoginError("Invalid Email or Password.");
      }
      setLoginError("Api failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeSafeAreaView className="relative flex-1 flex-row items-center justify-center w-full">
      <View className="w-full flex-col-reverse md:flex-row items-center justify-center">
        <View className="w-full md:w-[30%] p-8">
          <ThemeText className="flex-row w-full md:mt-8 text-center text-xl font-bold md:text-4xl">
            Login
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
                  onChangeText={(text) => {
                    onChange(text);
                    setLoginError("");
                  }}
                  value={value}
                  className="mt-10 rounded-md border font-regular px-2.5 py-2 outline-none focus:border-primary"
                  placeholderTextColor="gray"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
              )}
              name="email"
            />
            {errors.email ? (
              <ThemeText className="mt-0.5  font-regular italic text-red-500">
                Email is required.
              </ThemeText>
            ) : null}
          </View>
          <View className="relative mt-5">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="relative">
                  <ThemeInput
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      setLoginError("");
                    }}
                    value={value}
                    secureTextEntry={isShowPassword}
                    className="relative rounded-md border font-regular pl-2.5 pr-10 py-2 outline-none focus:border-primary"
                    placeholderTextColor="gray"
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  <TouchableOpacity
                    onPress={() => setIsShowPassword(!isShowPassword)}
                    className="absolute p-2.5 right-5"
                  >
                    {!isShowPassword ? (
                      <Eye width={20} height={20} fill="#EB9E4C" />
                    ) : (
                      <EyeOff width={20} height={20} fill="#EB9E4C" />
                    )}
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password ? (
              <ThemeText className="mt-0.5 italic  font-regular text-red-500">
                Password is required.
              </ThemeText>
            ) : null}
          </View>

          <View className="mt-5">
            {loginError ? (
              <ThemeText className="mb-2 text-center  font-regular font-extrabold text-red-500">
                {loginError}
              </ThemeText>
            ) : null}
            <BaseButton
              onPress={handleSubmit(onSubmit)}
              title={isLoading ? <ActivityIndicator color="white" /> : "Login"}
              disabled={isLoading}
              theme={theme}
            />
          </View>
        </View>

        <Image
          source={require("@/assets/images/ic_mobe.png")}
          alt="logo"
          className="w-full md:w-[30%] h-[200px] md:h-[19vw]"
          contentFit="contain"
        />
      </View>
    </ThemeSafeAreaView>
  );
};

export default Login;
