/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ssprimary50: "#c1d4e9",
        ssprimary100: "#a7c2dd",
        ssprimary200: "#8eafd2",
        ssprimary300: "#759ec7",
        ssprimary400: "#5c8cbd",
        ssprimary500: "#4a79b3",
        ssprimary600: "#3a68a9",
        ssprimary700: "#2b579f",
        ssprimary800: "#1c4695",
        ssprimary900: "#0b4f78",
      },
    },
  },
  plugins: [],
};
