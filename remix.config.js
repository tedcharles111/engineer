/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  browserNodeBuiltinsPolyfill: {
    modules: {
      buffer: true,
      crypto: true,
      events: true,
      path: true,
      stream: true,
      string_decoder: true,
      url: true,
      util: true,
    }
  }
};
