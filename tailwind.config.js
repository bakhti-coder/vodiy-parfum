module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      maxWidth: {
        1200: `${1200 / 16}rem`,
        800: `${800 / 16}rem`,
        708: `${708 / 16}rem`,
        358: `${358 / 16}rem`,
      },
    },
  },
  plugins: [],
};
