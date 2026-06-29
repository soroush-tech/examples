// this file will not afect the sandbox but will
// afect the deployment and dowload

import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
    // Emotion reads process.env.NODE_ENV at load time; shim it for the browser
    // IIFE so the bundle doesn't throw "process is not defined".
    intro: "var process = { env: { NODE_ENV: 'production' } };",
  },
  plugins: [
    svelte({
      // inject component <style> into the JS bundle rather than emitting a
      // separate .css import (avoids needing a dedicated CSS rollup plugin)
      emitCss: false,
      // enable run-time checks when not in production
      compilerOptions: {
        dev: !production,
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({ browser: true, dedupe: ['svelte'] }),
    commonjs(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
}
