// node.js환경 <- js파일 번들러기때문에 entry point -> js파일로 해야함

const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".vue", ".js"], // import 확장자 생략
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"), // ? 구성옵션에서 파일경로 입력 시, path.resolve 써야한다 -> 왜?
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/, // 정규표현식: .vue 확장자파일만 변환함
        use: "vue-loader",
      },
      {
        test: /\.s?css$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"], // 실행순서: 뒤 -> 앞
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: "src/index.html", // 내부에서 path.resolve 처리해서 생략
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }], // from -> to로 복사(to 생략 시, output.path가 기본값)
    }),
  ],
  devServer: {
    port: 1234,
  },
};
