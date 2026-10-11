/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  corePlugins: {
    // Nonaktifkan preflight agar reset default Tailwind tidak merusak styling native style.css
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'aira-dark': '#0e1317',
        'aira-card': 'rgba(13, 38, 48, 0.92)',
        'aira-header': '#06475d',
        'aira-text': '#f1f5f9',
        'aira-muted': '#94a8b3',
        'aira-light': '#c8e2ec',
        'aira-cyan': '#38bdf8',
        'aira-teal': '#088395',
        'aira-border': 'rgba(56, 189, 248, 0.25)',
      },
      borderRadius: {
        'aira-sm': '8px',
        'aira-md': '12px',
        'aira-pill': '20px',
      },
    },
  },
  plugins: [],
};
