import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--montserrat)", ...fontFamily.sans],
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;
