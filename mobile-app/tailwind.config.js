/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './features/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                regular: ['InterRegular', 'sans'],
                medium: ['InterMedium', 'sans'],
                bold: ['InterBold', 'sans'],
                heavy: ['InterSemiBold', 'sans'],
                RobotoMedium: ['RobotoMedium', 'sans'],
                RobotoBold: ['RobotoBold', 'sans'],
                RobotoSemiBold: ['RobotoSemiBold', 'sans'],
                RobotoBlack: ['RobotoBlack', 'sans'],
            },
        },
    },
    plugins: [],
};
