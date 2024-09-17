/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primarycolor: "#0A4DA2",
        White: "#FFFFFF",
        Black: "#002D67",
        Lightgray: "#F6F8FB",
        DarkYellow: "#FFD239",
        DarkBlue: "#093B7B",
        LightPink: "#FF9B9B",
        LightGreen: "#94EB9E",
        LightBlue: "#94CAEB",
        LightPurple: "#A594EB",
        Purple: "#DE94EB",
        LightYellow: "#EBD094",
        Textblack: "#393939",
        TextYellow: "#FFA939",
      },
      boxShadow: {
        custom: "0px 3px 11px rgba(10, 77, 162, 0.06)",
      },
    },
  },
  plugins: [],
};
