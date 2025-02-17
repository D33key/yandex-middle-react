import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	build: {},
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	plugins: [react(), tsconfigPaths()],
	server: {
		port: 8000,
	},
});
