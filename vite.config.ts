import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import express from './express-plugin.ts'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    express("src/server"),
  ],
});
