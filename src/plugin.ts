import fs from "fs";
import { globSync } from "glob";
import { Plugin } from "esbuild";

const envRegExp = (name: string) => {
  return new RegExp(String.raw`\bprocess\.env\.(${name})\b`, "g");
};

type AutoEnvPlugin = (options: {
  include?: string | string[];
  exclude?: string | string[];
  ignore?: string[];
}) => Plugin;

const autoEnv: AutoEnvPlugin = ({
  include = "src/**",
  exclude = "node_modules/**",
  ignore = [],
} = {}) => ({
  name: "autoEnv",
  setup: (build) => {
    const files = globSync(include, { ignore: exclude });
    const env: { [key: string]: string } = {};

    for (const file of files) {
      const src = fs.readFileSync(file, "utf8");
      for (const match of src.matchAll(envRegExp(".+?"))) {
        const name = match[1];
        const value = process.env[name];
        if (!ignore.includes(name) && value !== undefined) {
          env[name] = value;
        }
      }
    }

    build.initialOptions.define = {
      "process.env": JSON.stringify(env),
      ...build.initialOptions.define,
    };
  },
});

export { autoEnv };
