/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		setupFiles: './setup.js',
		env: {
			IS_REACT_ACT_ENVIRONMENT: 'true',
		},
		alias: {
			'@/': './'
		},
	},
});