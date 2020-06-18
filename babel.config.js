/* eslint-env node */

module.exports = (api) => {
  // https://stackoverflow.com/questions/53327625/cannot-find-module-babel-plugin-transform-react-jsx-source-when-running-react
  api.cache(true);
  return {
    presets: ['@babel/react', '@babel/preset-typescript'],
  };
};
