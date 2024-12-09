const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
  resolveLoader: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  entry: path.resolve(__dirname, 'App.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // Para archivos .js y .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',  // Para ES6+
              '@babel/preset-react',  // Para JSX
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,  // Archivos de imágenes y fuentes
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',  // Establece el formato del nombre del archivo
              outputPath: 'assets/',  // Establece el directorio de salida
            },
          },
        ],
      },
    ],
  },
};
