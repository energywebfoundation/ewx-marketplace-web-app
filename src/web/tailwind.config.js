/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import tailwindRadix from 'tailwindcss-radix';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default {
  content: [
    '../renderer/index.html',
    '../renderer/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      brand: '#a566ff',
      'brand-light': '#b37eff',
      'brand-dark': '#954aff',
      blue: '#58acff',
      teal: '#15e8ff',
      violet: {
        light: '#7B31D8',
        dark: '#4B00A8',
        darker: '#382f42',
      },
      pink: {
        light: '#F484D5',
        dark: '#de15ff',
      },
      red: '#F9436F',
      green: '#64FFE3',
      font: {
        DEFAULT: '#dddcdd',
        subtle: '#c2c2c2',
        subtler: '#989799',
        subtlest: '#646266',
      },
      gray: {
        5: '#f2f2f4',
        10: '#eae7ea',
        20: '#d1cfd1',
        30: '#b8b6b8',
        40: '#b7b5b9',
        50: '#8c898d',
        60: '#747176',
        70: '#4d4a51',
        80: '#3a383e',
        85: '#38363B',
        90: '#2b282e',
        95: '#262429',
        100: '#16141a',
        900: '#16141a',
      },
    },
    fontSize: {
      xs: '0.5rem', // 8px
      sm: '0.75rem', // 12px
      base: '0.875rem', // 14px
      lg: '1rem', // 16px
      xl: '1.5rem', // 24px
      '2xl': '2rem', // 32px
      '3xl': '2.5rem', // 40px
    },
    borderRadius: {
      none: '0',
      sm: '4px',
      md: '8px',
      DEFAULT: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
      full: '9999px',
    },
    extend: {
      fontFamily: {
        'primary-regular': ['BwGradualRegular', 'sans-serif'],
        primary: ['BwGradualMedium', 'sans-serif'],
        'primary-bold': ['BwGradualBold', 'sans-serif'],
        'primary-light': ['BwGradualLight'],
        rajdhani: ['Rajdhani'],
        'noto-emoji': ['NotoColorEmoji', 'sans-serif'],
      },
      boxShadow: {
        sm: '0px 2px 4px 0px rgba(0, 0, 0, 0.32)',
        DEFAULT: '4px 4px 4px 0px rgba(0, 0, 0, 0.24)',
        sunken: '0px 4px 16px 0px rgba(0, 0, 0, 0.32) inset',
        card: '-4px -4px 4px 0px rgba(161, 102, 255, 0.32), 4px 4px 8px 0px rgba(0, 0, 0, 0.40)',
        darker: '0px 4px 16px 0px rgba(0, 0, 0, 0.32)',
        inset:
          '0px 0px 12.33741px 0px #000 inset, 0px 4.00002px 4.00002px 0px rgba(0, 0, 0, 0.2' + '5)',
      },
      screens: {
        xl: '1220px',
      },
      keyframes: {
        // Dropdown menu
        'slide-down-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up-fade-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
        },
        // Dialog
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        // Dropdown menu
        'slide-down-fade-in': 'slide-down-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-fade-out': 'slide-up-fade-out 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        // Dialog
        'fade-in': 'fade-in 0.2s ease-in-out',
        'fade-out': 'fade-out 0.2s ease-in-out',
        // Spinner
        spin: 'spin 2s linear infinite',
      },
    },
  },
  plugins: [
    tailwindRadix(),
    plugin(({ addUtilities, matchUtilities, theme }) => {
      addUtilities({
        '.text-gradient': {
          background: `
          -webkit-linear-gradient(45deg,
            ${theme('colors.brand')},
            ${theme('colors.teal')}
          )`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-button-gradient': {
          background: `linear-gradient(90deg, ${theme('colors.brand')} 1.78%, #A166FF 45.2%, #158FFF 99.79%)`,
        },
        '.bg-popup-gradient': {
          background:
            'linear-gradient(95deg, rgba(165, 102, 255, 0.32) 12.33%, rgba(88, 172, 255, 0.32' +
            ') 49.68%, rgba(21, 232, 255, 0.32) 75.83%)',
        },
        '.bg-hero-gradient': {
          background: `-webkit-linear-gradient(40deg, ${theme(
            'colors.gray.90',
          )} 52%, rgba(0, 0, 0, 1) 53%, rgba(0,0,0,0) 62%)`,
        },
        '.bg-worker-gradient': {
          background:
            'linear-gradient(131deg, #0B4B79 50%, rgba(43, 78, 103, 0.82) 58%, rgba(104, 126, 143, 0.66) 66%, rgba(217, 217, 217, 0) 74%)',
        },
        '.bg-radial-gradient': {
          background:
            'radial-gradient(152.95% 53.94% at 56.25% 48.56%, rgba(161, 102, 255, 0.16) 0%, r' +
            'gba(0, 0, 0, 0.16) 100%), #16141A',
        },
        '.bg-dark-gradient': {
          background: 'linear-gradient(138deg, #090909 18.54%, #505050 100%)',
        },
        '.bg-darker-gradient': {
          background: 'linear-gradient(138deg, #1F1F1F 18.54%, rgba(146, 146, 146, 0.00) 100%)',
        },
        '.bg-button-gray-gradient': {
          background:
            'radial-gradient(52.47% 52.47% at 50% 52.46%, #292929 0%, rgba(90, 90, 90, 0.49) ' +
            '75.75%, rgba(146, 146, 146, 0.00) 100%)',
        },
        '.bg-gray-gradient': {
          background: 'linear-gradient(138deg, #393838 18.54%, rgba(146, 146, 146, 0.00) 100%)',
        },
        '.bg-graylight-gradient': {
          background: 'linear-gradient(138deg, #1F1F1F 18.54%, #4A464E 100%)',
        },
        '.gradient-border': {
          background:
            'linear-gradient(rgb(62, 50, 80),  rgb(62, 50, 80)) padding-box, linear-gradient(' +
            '180deg, #A566FF 0%, #158FFF 52.78%, #15E8FF 100%) border-box',
        },
        '.shadow-purple': {
          filter:
            'drop-shadow(0px 0px 5px rgba(165, 102, 255, 0.50)) drop-shadow(0px 0px 7px rgba(' +
            '21, 232, 255, 0.10))',
        },
        '.bg-sidebar-gradient': {
          background: `linear-gradient(to bottom right, ${theme(
            'colors.brand',
          )} 9%, #242424 32%, #15ABFF 35%, #2B282E 49%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, ${theme(
            'colors.brand',
          )} 9%, #242424 32%, #15ABFF 35%, #2B282E 49%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, ${theme(
            'colors.brand',
          )} 9%, #242424 32%, #15ABFF 35%, #2B282E 49%) top left / 50% 50% no-repeat, linear-gradient(to top right, ${theme(
            'colors.brand',
          )} 9%, #242424 32%, #15ABFF 35%, #2B282E 49%) top right / 50% 50% no-repeat`,
        },
        '.text-sidebar-menu-active': {
          color: '#C499FF',
        },
        '.notification-shadow': {
          'box-shadow': '0px 4px 16px 0px rgba(0, 0, 0, 0.32)',
        },
        '.bg-notification-gradient': {
          background: `linear-gradient(88.36deg, rgba(0, 0, 0, 0) 3.57%, rgba(122, 122, 122, 0.31) 102%), linear-gradient(270deg, #4D4A51 11.85%, rgba(58, 56, 62, 0.48) 94.83%)`,
        },
      });

      matchUtilities(
        {
          'gradient-border-primary-with': (color) => {
            return {
              background: `
                linear-gradient(${color}, ${color}) padding-box,
                linear-gradient(to right,
                  ${theme('colors.brand')},
                  ${theme('colors.teal')}
                ) border-box`,
            };
          },
          'gradient-border-secondary-with': (color) => {
            return {
              background: `
                linear-gradient(${color}, ${color}) padding-box,
                linear-gradient(to right,
                  ${theme('colors.brand')},
                  ${theme('colors.teal')},
                  ${theme('colors.violet.dark')}
                ) border-box`,
            };
          },
          'gradient-border-dark-with': (color) => {
            return {
              background: `
                linear-gradient(${color}, ${color}) padding-box,
                linear-gradient(to right,
                  ${theme('colors.transparent')},
                  ${theme('colors.gray.70')},
                  ${theme('colors.transparent')}
                ) border-box`,
            };
          },
        },
        {
          // This is required in order to use nested colors
          values: flattenColorPalette(theme('colors')),
        },
      );
    }),
  ],
};
