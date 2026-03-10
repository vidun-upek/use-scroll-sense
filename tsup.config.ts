import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'], // CommonJS and ESModules support
  dts: true, // Generates TypeScript definition files
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'], // Excludes React from the final bundle
});