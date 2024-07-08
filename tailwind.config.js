/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      nike: ["Anton", "sans-serif"],
      gothic: ["Gothic A1", "sans-serif"],
      prompt: ["Prompt", "sans-serif"],
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        textDark: "#fafafa",
        textLight: "",
        bgDark: "#0c0c0c",
        bgLight: "",
      },
    },
  },
  plugins: [],
};
