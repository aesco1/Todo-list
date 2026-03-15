import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(import.meta.dirname, 'dist'),
    clean: true,
  },
};