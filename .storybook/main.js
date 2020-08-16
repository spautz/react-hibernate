module.exports = {
  "stories": [
    "../packages/*/stories/**/*.stories.mdx",
    "../packages/*/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-actions',
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config) => {
    config.performance.hints = false;
    return config;
  },
}
