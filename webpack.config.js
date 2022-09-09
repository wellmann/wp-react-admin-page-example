let [editorConfig] = require('@wellmann/gutenberg-blocks-components/configs/webpack.config');

editorConfig.entry = {
  'app': './src/app.js',
};

editorConfig.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
};

module.exports = editorConfig;