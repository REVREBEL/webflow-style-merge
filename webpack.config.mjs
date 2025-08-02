
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import dotenv from 'dotenv';
import path from 'path';

// Load env variables
const env = dotenv.config().parsed || {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DefinePlugin } = webpack;

export default {
  entry: './src/bootstrap.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  //
  plugins: [
    new DefinePlugin({
      'import.meta.env.VITE_NEXTJS_API_URL': JSON.stringify(env.VITE_NEXTJS_API_URL || 'http://localhost:3000'),
      'import.meta.env.DESIGNER_API_URL': JSON.stringify(env.DESIGNER_API_URL || 'http://localhost:1337'),
      'process.env.VITE_NEXTJS_API_URL': JSON.stringify(env.VITE_NEXTJS_API_URL || 'http://localhost:3000'),
      'process.env.DESIGNER_API_URL': JSON.stringify(env.DESIGNER_API_URL || 'http://localhost:1337'),
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

