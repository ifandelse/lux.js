import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		include: ["lux.js"]
	},
	build: {
		commonjsOptions: {
			include: [/lux\.js/, /node_modules/]
		}
	}
});
