# esbuild-plugin-auto-env

An [esbuild](https://esbuild.github.io/) plugin which automatically replaces environment variables used in code with those defined at build time.

## Install

```sh
npm i -D esbuild-plugin-auto-env
```

or

```sh
yarn add -D esbuild-plugin-auto-env
```

## Usage

The following build script will replace all environment variables found in the `src` directory with those defined at build time. If an environment variable is found but not defined at build time it will not be replaced unless `platform` is set to `browser`, in which case it will be replaced with `undefined`.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv()],
});
```

### `include`

Default: `src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}`

Glob pattern(s)* determining which files to find environment variables in. The following build script will replace environment variables found in any file under the `lib` directory.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ include: "lib/**" })],
});
```

### `exclude`

Default: `node_modules/**`, `src/**/*.{spec,test}*`

Glob pattern(s)* determining which files not to find environment variables in. The following build script will not replace environment variables found in any file under the `node_modules` or `src/test` directories.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ exclude: ["node_modules/**", "src/test/**"] })],
});
```

### `ignore`

Default: `[]`

List of environment variable names not to replace. The following build script will not replace `process.env.TEST` even if it occurs in a file matched by `include`.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ ignore: ["TEST"] })],
});
```

\*_See full glob syntax [here](https://github.com/isaacs/node-glob#readme)_
