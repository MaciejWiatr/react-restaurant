const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "light-blue": colors.lightBlue,
                cyan: colors.cyan,
            },
            backgroundImage: {
                "hero-img":
                    "url('https://images.pexels.com/photos/2923034/pexels-photo-2923034.jpeg?cs=srgb&dl=pexels-edward-eyer-2923034.jpg&fm=jpg')",
            },
            width: {
                card: "36rem",
            },
            zIndex: {
                max: "99",
            },
        },
    },
    variants: {},
    plugins: [
        plugin(function ({ addUtilities }) {
            const utils = {
                ".skew-10deg": {
                    transform: "skewY(-10deg)",
                },
                ".skew-15deg": {
                    transform: "skewY(-15deg)",
                },
                ".flex-center": {
                    "justify-content": "center",
                    "align-items": "center",
                },
            };

            addUtilities(utils);
        }),
    ],
};
