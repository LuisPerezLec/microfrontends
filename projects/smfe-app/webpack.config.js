const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const federationConfig = withModuleFederationPlugin({
    name: "smfe-app",

    exposes: {
      "./BannerComponent":
        "./projects/smfe-app/src/app/banner/banner.component.ts",
    },

    shared: {
      ...shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      }),
    },
  });

  return {
    ...federationConfig,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader", // Ensure postcss-loader is used for Tailwind
          ],
        },
      ],
    },
    plugins: [
      ...federationConfig.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
  };
};
