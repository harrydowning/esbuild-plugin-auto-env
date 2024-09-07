import esbuild from "esbuild";

const config = {
  entryPoints: ["src/plugin.ts"],
  platform: "node",
  bundle: true,
  minify: true,
};

esbuild.build({
  ...config,
  format: "cjs",
  outfile: "dist/plugin.cjs",
});

esbuild.build({
  ...config,
  format: "esm",
  outfile: "dist/plugin.mjs",
});
