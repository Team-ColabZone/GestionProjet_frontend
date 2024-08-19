/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  purge: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./src/components/AuthentificationPage.vue",
    "./src/components/CreateAccountpage.vue",
    "./src/components/Home_page.vue",
    "./src/components/LoadingPage.vue",
    "./src/components/PrivacyPolicy_page.vue"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}