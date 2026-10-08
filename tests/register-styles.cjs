// Node SSR contract tests do not run Next's CSS-module loader. Browser QA tests the real styles.
require.extensions['.scss'] = function registerStyles(module) {
  module.exports = new Proxy({}, {get: (_, name) => name === '__esModule' ? false : String(name)})
}
