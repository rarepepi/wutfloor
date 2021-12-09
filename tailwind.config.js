// tailwind.config.js

module.exports = {
  mode: "jit",
  important: true,
  purge: [],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      'primary': '#34d399',
      'secondary': '#8a5cf6',
      'danger': '#e3342f',
      'background': '#181818',
      'bg-light': '#303048'
    }),
    extend: {
      backgroundImage: (theme) => ({
        "bg-logo": "url('/img/logo.png')",
      }),
      zIndex: {

        '-10': '-10',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
    fontFamily: {
      'press-start': ['"Press Start 2P"', 'cursive'],
      'share-tech': ['"Share Tech"', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-line-length')({
      widths: {
        'xs': '18em', // 300px at 1rem
        'sm': '30em',
        'md': '35em', // 560px at 1rem
        'lg': '40em',
        'xl': '50em', // 800px at 1rem
      },
      variants: ['responsive'],
    })
  ],
};
