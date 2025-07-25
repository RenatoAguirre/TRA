/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Explicit background colors
    'bg-red-300',
    'bg-pink-300',
    'bg-purple-300',
    'bg-violet-300',
    'bg-indigo-300',
    'bg-blue-300',
    'bg-sky-300',
    'bg-cyan-300',
    'bg-teal-300',
    'bg-emerald-300',
    'bg-green-300',
    'bg-lime-300',
    'bg-yellow-300',
    'bg-amber-300',
    'bg-orange-300',
    // Pattern matching for background colors
    {
      pattern: /bg-(red|pink|purple|violet|indigo|blue|sky|cyan|teal|emerald|green|lime|yellow|amber|orange)-300/,
    },
  ],
};
