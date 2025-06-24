const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = (env, argv) => {
  const federationConfig = withModuleFederationPlugin({
    name: "mfe-app",

    exposes: {
      "./SearchComponent":
        "./projects/mfe-app/src/app/search/search.component.ts",
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
