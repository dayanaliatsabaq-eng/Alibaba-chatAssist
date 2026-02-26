/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#ff6600',
                    dark: '#e65c00',
                    light: '#fff5f0',
                }
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
            },
            borderRadius: {
                'custom': '8px',
            }
        }
    },
    plugins: [],
}
