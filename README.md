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

The following shows the simplest use of this plugin. This will replace all environment variables used in the `src` directory with those defined at build time. If an environment variable is used in code but not defined at build time it will not be replaced unless `platform` is set to `browser`.

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

Default: `src/**`

Glob pattern(s)* determining which files to replace environment variables in. The following build script will replace environment variables found in all javascript files.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ include: "**/*.js" })],
});
```

### `exclude`

Default: `node_modules/**`

Glob pattern(s)* determining which files not to replace environment variables in. The following build script will replace all environment variables except for `process.env.TEST`.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ exclude: ["src/"] })],
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

\*_See full glob syntax [here](https://github.com/isaacs/node-glob)_
