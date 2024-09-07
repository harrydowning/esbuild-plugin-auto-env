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

After running the following build script

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

With the following command

```sh
TEST=true node build.mjs
```

Every use of `process.env.TEST` will be replaced with `"true"`. If an environment variable is used in code but not defined at build time it will be set to `undefined`.

### `filter`

To replace environment variables only in certain files a `filter` regex can be specified. The following build script will only replace environment variables found in the `src` directory.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ filter: /src/ })],
});
```

### `exclude`

To stop specific environment variables from being replaced an `exclude` list can be specified. The following build script will replace all environment variables except for `process.env.TEST`.

```js
import esbuild from "esbuild";
import { autoEnv } from "esbuild-plugin-auto-env";

esbuild.build({
  entryPoints: ["src/index.js"],
  outfile: "dist/index.js",
  bundle: true,
  plugins: [autoEnv({ exclude: ["TEST"] })],
});
```
