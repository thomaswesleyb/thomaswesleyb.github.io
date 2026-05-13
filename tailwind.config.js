/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1e1e1e',
        'text-primary': '#e2e8f0',
        'text-muted': '#64748b',
        accent: '#3b82f6',
        'accent-dim': '#1d4ed8',
      },
    },
  },
  plugins: [],
};
