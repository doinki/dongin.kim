import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, postcssPresetEnv],
    },
  },
  plugins: [ViteMinifyPlugin(), viteSingleFile()],
});
