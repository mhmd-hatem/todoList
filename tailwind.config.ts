import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/**/*.{html,js,ts,jsx,tsx}",
		"./public/**/*.{html,js,ts,jsx,tsx}",
		"./index.html",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				merienda: ["Merienda", "sans-serif"],
				jetbrains: ["JetBrains Mono", "monospace"],
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
} satisfies Config;
