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

                //categories
                "blu": "#c7dae7",
                "pale": "#d1dcdb",
                "tinky": "#e0ceeb",
                "fleet": "#c9caec",
                "pinky": "#f1c3d8",
                "sugar-pink": "#e3dade",
                "sick": "#cae8dd"
            },
            aspectRatio: {
                "tile": "16/14",
            }
        },
    },
    plugins: [],
}