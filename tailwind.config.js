/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "nice-gray": "#282c2d",
                "bone": "#edeeee",
            }
        },
    },
    plugins: [],
}