// @ts-check

const esbuild = require("esbuild");
const packageJson = require("./package.json");

/**
 * @type {import('esbuild').BuildOptions}
 */
const config = {
  entryPoints: ["src/plugin.ts"],
  platform: "node",
  bundle: true,
  minify: true,
  metafile: true,
  external: Object.keys(packageJson.dependencies),
};

const cjsResult = esbuild.build({
  ...config,
  format: "cjs",
  outfile: "dist/plugin.cjs",
});

const esmResult = esbuild.build({
  ...config,
  format: "esm",
  outfile: "dist/plugin.mjs",
});

Promise.all([cjsResult, esmResult]).then((results) => {
  results.forEach((result) => {
    if (!result.metafile) return;
    console.log(esbuild.analyzeMetafileSync(result.metafile, { color: true }));
  });
});
