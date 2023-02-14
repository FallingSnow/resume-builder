import { sveltekit } from '@sveltejs/kit/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [tsconfigPaths(), sveltekit()]
};

export default config;
