import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import json from "rollup-plugin-json";
import copy from "rollup-plugin-copy";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  external: ["react"],
  output: {
    format: "umd",
    name: "ReactChatLib",
    globals: {
      react: "React"
    }
  },
  plugins: [
    json(),
    copy({
      targets: [
        {
          src: "src/components/EmojiPicker/emojiDataLib.json",
          dest: "lib/components/EmojiPicker"
        }
      ]
    }),
    nodeResolve(),
    babel({
      runtimeHelpers: false,
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  ]
};

if (env === "production") {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true
      }
    })
  );
}

export default config;
