import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig([
  // ESM build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true,
    },
    external: [
      // List peer deps or external libs here, e.g. 'lodash'
    ],
    treeshake: {
      moduleSideEffects: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // we generate declarations separately
        outDir: 'dist/esm',
      }),
    ],
  },
  // CJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    external: [
      // same external if needed
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: 'dist/cjs',
      }),
    ],
  },
  // UMD build (optional) - for direct <script> usage in a browser
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/clientwire-api.js',
      format: 'umd',
      name: 'ClientWireAPI', // The global variable name if someone loads script directly
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: 'dist/umd',
      }),
    ],
  },
]);
