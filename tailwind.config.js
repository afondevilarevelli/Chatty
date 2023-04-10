const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    // daisyui: {
    //     themes: [
    //         {
    //             mytheme: {
    //                 primary: "#f2cb57",
    //                 secondary: "#e2ab58",
    //                 accent: "#53e0d6",
    //                 neutral: "#272B3A",
    //                 "base-100": "#F4EEF6",
    //                 info: "#9CC2EC",
    //                 success: "#5EDEB6",
    //                 warning: "#F3C035",
    //                 error: "#FD5E66",
    //             },
    //         },
    //     ],
    // },

    plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
