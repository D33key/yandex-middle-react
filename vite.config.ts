import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	plugins: [react(), tsconfigPaths()],
	base: process.env.NODE_ENV === 'production' ? './yandex-middle-react/' : './',
});
