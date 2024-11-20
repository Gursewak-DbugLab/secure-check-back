const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      alias: {
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js',
        'balm-ui-css': 'balm-ui/dist/balm-ui.css'
      }
    }
  }

  // Si tu préfères utiliser chainWebpack :
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('balm-ui-plus', 'balm-ui/dist/balm-ui-plus.js')
  //     .set('balm-ui-css', 'balm-ui/dist/balm-ui.css');
  // }
});
