import { defineConfig } from "eslint/config";
import reactCompiler from "eslint-plugin-react-compiler";
import webVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([reactCompiler.configs.recommended, webVitals]);
