const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
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
