import fs from "fs";
import { globSync } from "glob";
import { Plugin } from "esbuild";

type AutoEnvPlugin = (options?: {
  include?: string | string[];
  exclude?: string | string[];
  ignore?: string[];
}) => Plugin;

const autoEnv: AutoEnvPlugin = ({
  include = "src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
  exclude = ["node_modules/**", "src/**/*.{spec,test}*"],
  ignore = [],
} = {}) => ({
  name: "autoEnv",
  setup: (build) => {
    const options = build.initialOptions;
    const files = globSync(include, { ignore: exclude, nodir: true });
    const env: { [key: string]: string } = {};

    for (const file of files) {
      const src = fs.readFileSync(file, "utf8");
      for (const match of src.matchAll(/\bprocess\.env\.(.+?)\b/g)) {
        const name = match[1];
        const value = process.env[name];
        const fullName = `process.env.${name}`;

        if (ignore.includes(name)) {
          continue;
        }

        if (value === undefined) {
          if (options.platform === "browser") {
            env[fullName] = "undefined";
          }
        } else {
          env[fullName] = JSON.stringify(value);
        }
      }
    }

    options.define = {
      ...env,
      ...options.define,
    };
  },
});

export { autoEnv };
