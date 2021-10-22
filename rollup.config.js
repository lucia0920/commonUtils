import typescript from "rollup-plugin-typescript";

export default {
    input: "modules/index.js",
    output: [
      {
        file: "lib/bundle.cjs.js",
        format: "cjs",
      },
      {
        file: "lib/bundle.esm.js",
        format: "es",
      },
    ],
    plugins: [
        typescript({
          exclude: "node_modules/**",
          typescript: require("typescript"),
        }),
      ],
  };