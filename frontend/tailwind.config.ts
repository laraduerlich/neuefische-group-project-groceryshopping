import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Scan all frontend files
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;
