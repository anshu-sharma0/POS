/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./custom-elements/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EB9E4C",
          dark: "#EB9E4C",
        },
        secondary: {
          DEFAULT: "#10B981",
          dark: "#34D399",
        },
        background: {
          DEFAULT: "#ffffff",
          dark: "#000000",
          hover: "#020817",
          "table-card": "#f5f5f5",
          "table-card-dark": "#28282a",
          billed: "#bcbcbc",
          "billed-dark": "#57534e",
          footer: "#f5f5f5",
        },
        text: {
          DEFAULT: "#ffffff",
          dark: "#000000",
          billed: "#a1a1aa",
          grey: "#a2a3a1",
        },
        accent: {
          DEFAULT: "#F59E0B",
          dark: "#ffffff",
        },
        border: {
          DEFAULT: "#e6e6e5",
          dark: "#28282a",
        },
      },
      fontFamily: {
        sans: ["Poppins_400Regular"],
        thin: ["Poppins_100Thin"],
        "thin-italic": ["Poppins_100Thin_Italic"],
        extralight: ["Poppins_200ExtraLight"],
        "extralight-italic": ["Poppins_200ExtraLight_Italic"],
        light: ["Poppins_300Light"],
        "light-italic": ["Poppins_300Light_Italic"],
        regular: ["Poppins_400Regular"],
        "regular-italic": ["Poppins_400Regular_Italic"],
        medium: ["Poppins_500Medium"],
        "medium-italic": ["Poppins_500Medium_Italic"],
        semibold: ["Poppins_600SemiBold"],
        "semibold-italic": ["Poppins_600SemiBold_Italic"],
        bold: ["Poppins_700Bold"],
        "bold-italic": ["Poppins_700Bold_Italic"],
        extrabold: ["Poppins_800ExtraBold"],
        "extrabold-italic": ["Poppins_800ExtraBold_Italic"],
        black: ["Poppins_900Black"],
        "black-italic": ["Poppins_900Black_Italic"],
      },
    },
  },
  plugins: [],
};
