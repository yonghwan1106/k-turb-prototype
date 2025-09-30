export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'turb-green': '#4CAF50',
        'turb-yellow': '#FFC107',
        'turb-orange': '#FF9800',
        'turb-red': '#F44336',
        'turb-blue': '#2196F3',
      },
    },
  },
};