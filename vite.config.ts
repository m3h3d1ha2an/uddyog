import netlify from "@netlify/vite-plugin-tanstack-start";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		netlify(),
		tailwindcss(),
		tanstackStart({
			srcDirectory: "src",
			router: {
				indexToken: "page",
				routeToken: "layout",
				generatedRouteTree: "generated/routes.tsx",
			},
		}),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
	],
});

export default config;
