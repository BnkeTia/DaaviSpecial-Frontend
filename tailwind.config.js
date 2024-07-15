/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{html,jsx}',
  // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'open-menu': {
          '0%': { transform: 'scaleY(0)' },
          '80%': { transform: 'scaleY(1.2)' },
          '100%': { transform: 'scaleY(1)' }
        }
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards'
      },
      colors: {
        papayawhip: {
          light: '#fef4e4',
          DEFAULT: '#ffefd5',
          dark: '#fee5bc'
        }
      },
      screens: {

        // 'widescreen': { 'raw': '(min-aspect-ratio: 3/2)' },
        // 'tallscreen': { 'raw': '(max-aspect-ratio: 13/20)' },
      },
    // colors: {
    //   papayawhip: {
    //     light: '#fef4e4',
    //     DEFAULT: '#ffefd5',
    //     dark: '#fee5bc',
    //   }
    // },
    },
    colors: {
      papayawhip: {
        light: '#fef4e4',
        DEFAULT: '#ffefd5',
        dark: '#fee5bc'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // require('tw-elements/dist/plugin'),
    require('flowbite/plugin'),
  // require('prettier-plugin-tailwindcss'),
  ]
};
