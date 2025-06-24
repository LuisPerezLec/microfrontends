const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const federationConfig = withModuleFederationPlugin({
    name: "host-app",
    remotes: {
      mfeApp: "mfeApp@http://localhost:4300/remoteEntry.js",
      smfeApp: "smfeApp@http://localhost:4400/remoteEntry.js",
    },
    exposes: {
      "./Component": "./projects/host-app/src/app/app.component.ts",
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
