import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const outputDir = './out';

export default defineConfig({
  input: 'src/main.ts',
  output: {
    file: `${outputDir}/videojs-gossip.js`,
    format: 'umd',
    name: 'videojsGossip',
    globals: {
      'video.js': 'videojs'
    },
    interop: 'compat',
    sourcemap: true
  },
  external: [
    'video.js'
  ],
  plugins: [
    typescript({
      resolveJsonModule: true
    })
  ]
});