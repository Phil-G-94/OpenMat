/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bittersweet: "#ef6461",
                yellow: "#e4b363",
                white: "#e8e9eb",
                alabaster: "#e0dfd5",
                onyx: "#313638",
            },
        },
    },
    plugins: [],
};
