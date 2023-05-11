import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import terser from '@rollup/plugin-terser';

const outputDir = './out';

const output = {
  file: `${outputDir}/videojs-gossip.js`,
  format: 'umd',
  name: 'videojsGossip',
  globals: {
    'clsx': 'clsx',
    'lodash': '_',
    'react-dom': 'ReactDOM',
    'react': 'React',
    'video.js': 'videojs'
  },
  interop: 'compat',
  sourcemap: true
};

export default defineConfig({
  input: 'src/main.ts',
  moduleContext: (id) => id.includes('react-icons') ? 'window' : 'undefined',
  output: [
    {
      ...output,
      file: `${outputDir}/videojs-gossip.js`
    },
    {
      ...output,
      file: `${outputDir}/videojs-gossip.min.js`,
      plugins: [
        terser({
          keep_classnames: true
        })
      ]
    },
  ],
  external: [
    'clsx',
    'lodash',
    'react-dom',
    'react-icons',
    'react',
    'video.js'
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript()
  ]
});