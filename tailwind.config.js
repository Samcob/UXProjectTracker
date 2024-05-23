/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      colors: {
        'dha-dark-blue': {
          DEFAULT: '#07192D',
          50: '#9FC5F0',
          100: '#8DBBED',
          200: '#6AA5E8',
          300: '#4690E2',
          400: '#237BDD',
          500: '#1D67BA',
          600: '#175497',
          700: '#124074',
          800: '#0C2D50',
          900: '#07192D',
          950: '#030C15', //Unused
        },
        'dha-blue': {
          DEFAULT: '#092068',
          50: '#D1DBFB',
          100: '#BECCF9',
          200: '#98AFF6',
          300: '#7392F3',
          400: '#4D75F0',
          500: '#2857EC',
          600: '#1343D9',
          700: '#0F37B3',
          800: '#0C2C8E',
          900: '#092068',
          950: '#07184E',
        },
        'dha-red': {
          DEFAULT: '#582831',
          50: '#F4E7E9',
          100: '#EED9DD',
          200: '#E1BDC4',
          300: '#D4A1AA',
          400: '#C78591',
          500: '#BB6978',
          600: '#AC4E60',
          700: '#904250',
          800: '#743541',
          900: '#582831',
          950: '#451F26',
        },
        'dha-grey': {
          DEFAULT: '#414042',
          50: '#EEEEEF',
          100: '#E4E4E5',
          200: '#D0CFD1',
          300: '#BBBABC',
          400: '#A7A6A8',
          500: '#939194',
          600: '#7E7C80',
          700: '#6A686B',
          800: '#555457',
          900: '#414042',
          950: '#333234',
        },
        'dha-light-blue': {
          DEFAULT: '#5992FA',
          50: '#FFFFFF',
          100: '#F7FAFF',
          200: '#D0E0FE',
          300: '#A8C6FC',
          400: '#81ACFB',
          500: '#5992FA',
          600: '#236EF8',
          700: '#0752DC',
          800: '#053EA6',
          900: '#032A6F',
          950: '#031F54',
        },
        'dha-green': {
          DEFAULT: '#5AAB46',
          50: '#C9E6C2',
          100: '#BDE0B4',
          200: '#A3D497',
          300: '#8AC97A',
          400: '#70BD5D',
          500: '#5AAB46',
          600: '#458336',
          700: '#305B25',
          800: '#1B3415',
          900: '#060C05',
          950: '#000000',
        },
        'dha-yellow': {
          DEFAULT: '#FFD03F',
          50: '#FFFDF7',
          100: '#FFF8E2',
          200: '#FFEEB9',
          300: '#FFE491',
          400: '#FFDA68',
          500: '#FFD03F',
          600: '#FFC207',
          700: '#CE9B00',
          800: '#967100',
          900: '#5E4700',
          950: '#423200',
        },
        'primary-color': '#00015E', // App Header and Footer
        'secondary-color': '#00015E', // Buttons and Side Menu
        'secondary-color-light': '#336699', // Buttons
        'accent-color': '#FECB34', // Highlighitng and notification type text
        'primary-font-color': '#1F2937', //Color used for most of the content in the app
        'secondary-font-color': '#FFFFFF', // Color used for the text in the UI elements such as the App bar and buttons
        'primary-accent-font-color': '#00015E', // Color for the text headers
        'secondary-accent-font-color': '#336699', // Color for the text headers
        'primary-background-color': '#FFFFFF', // Background color for whole app
        'secondary-background-color': '#C1C1C1', // Secondary color for the home page and a few list pages
        'notification-highlight': '#E83D27', // Notification "New" icon and other notification highlighting
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': theme('colors.primary-accent-font-color'),
            color: theme('colors.primary-font-color'),
            'h1, h2, h3, h4, h5, h6': {
              'margin-bottom': '.25rem',
            },
            'ul, ol': {
              'margin-top': 0,
            },
            p: {
              'margin-bottom': 0,
              'margin-top': '.25rem',
            },
            'ul > li::marker': {
              color: theme('colors.secondary-color-light'),
            },
            'ul > li > ul > li::marker': {
              color: theme('colors.primary-color'),
            },
            'ol > li::marker': {
              'font-weight': 'bold',
            },
            a: {
              color: theme('colors.hyperlink'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('daisyui')
  ], 
  daisyui: {
    themes: ['light'],
  },
}

