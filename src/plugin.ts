import fs from "fs";
import { Plugin } from "esbuild";

const envRegExp = (name: string) => {
  return new RegExp(String.raw`\bprocess\.env\.(${name})\b`, "g");
};

type AutoEnvPlugin = (options: {
  filter?: RegExp;
  exclude?: string[];
}) => Plugin;

export const autoEnv: AutoEnvPlugin = ({
  filter = /.*/,
  exclude = [],
} = {}) => ({
  name: "autoEnv",
  setup: (build) => {
    build.onLoad({ filter }, (args) => {
      let src = fs.readFileSync(args.path, "utf8");
      for (const match of src.matchAll(envRegExp(".+?"))) {
        const name = match[1];
        if (!exclude.includes(name)) {
          const value = JSON.stringify(process.env[name]) || "undefined";
          src = src.replace(envRegExp(name), value);
        }
      }
      return { contents: src, loader: "default" };
    });
  },
});
