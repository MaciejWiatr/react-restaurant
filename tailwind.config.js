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
                "hero-img": "url('/bg.jpg')",
            },
            width: {
                card: "36rem",
            },
            zIndex: {
                max: "99",
            },
            ripple: (theme) => ({
                colors: theme("colors"),
            }),
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
        require("tailwindcss-textshadow"),
        require("tailwindcss-ripple")(),
        require("@tailwindcss/forms"),
    ],
};
