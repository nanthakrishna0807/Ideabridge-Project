/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brandBlue: '#1e3a8a', // Deep corporate blue
                brandOrange: '#f97316', // Vibrant startup orange
                darkBg: '#0f172a',
                glassBg: 'rgba(255, 255, 255, 0.1)'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
