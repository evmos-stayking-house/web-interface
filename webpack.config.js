const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const port = process.env.REACT_APP_WEB_CLIENT_PORT || 3101;

const sass = require('sass');
const path = require('path');

module.exports = {
  // 개발환경 "development" | "production" | "none"
  // mode:
  //   process.env.REACT_APP_APP_ENV === 'local' ? 'development' : 'production',
  mode: 'development',
  resolve: {
    // 확장자 생략
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: { crypto: false },
  },
  devtool: 'inline-source-map',

  // 애플리케이션 시작 경로
  entry: './src/index.js',

  // 번들된 파일 경로
  output: {
    publicPath: '/',
    filename: 'bundle.[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // js and jsx 파일에 룰 적용
        loader: 'babel-loader', // 로더  (.babelrc 파일을 만들어서 프리셋을 관리 할 수 있음)
        exclude: /node_modules/, // 제외 폴더
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@loadable/babel-plugin'], // 로더 preset
        },
      },
      {
        test: /\.tsx?/,
        exclude: /node_modules/, // 제외 폴더
        use: ['ts-loader'],
        // apiUrls.ts-loader  tsconfig에서 옵션 가져옴.
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      // css loader
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
  // output에 plugin 추가
  plugins: [
    // html file을 지정해서 빌드 폴더에 넣어주는 플러그인
    new Dotenv({ systemvars: true, silent: true }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // 추가될 html 템플릿
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port,
  },
};
