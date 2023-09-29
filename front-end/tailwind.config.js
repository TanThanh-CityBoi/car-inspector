/** @type {import('tailwindcss').Config} */

module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         colors: {
            primary: {
               5: "#F2FBFD",
               50: "#EBE7F7",
               100: "#CDC5EB",
               200: "#AB9FDF",
               300: "#8978D3",
               400: "#6E5CC9",
               500: "#2797f3",
               600: "#473CB9",
               700: "#0487f2",
            },
            black: {
               5: "#F2F3F4",
               20: "#F7F7F7",
               50: "#CED2D3",
               80: "#3A494E",
               100: "#091C21",
               200: "#161616",
            },
         },
      },
   },
   plugins: ["prettier-plugin-tailwindcss"],
};
