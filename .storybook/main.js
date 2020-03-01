module.exports = {
  stories: ['../packages/**/stories/**/*.stories.(js|ts|jsx|tsx)'],
  addons: ['@storybook/addon-knobs/register', '@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: { compilerOptions: { declaration: false } },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });

    config.performance.hints = false;
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
