
/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-minmax-255': 'repeat(auto-fit, minmax(255px, 1fr))',
      },
      colors: {
        customBeige: '#f8f4ed',
        customFooter: '#F3EADE',
        customBrown: '#3F392B',
        customPink: '#D38D8D',
        customSilverSand: '#C9C2BA',
        customLightBrown: '#B18650',
        customMintGreen: '#3CB77D',
        customRoyalPurple: '#61259d',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ตั้งค่าให้ฟอนต์หลักเป็น Poppins
      },
    },
  },
  plugins: [],
};
