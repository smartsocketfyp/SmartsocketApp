module.exports = {
    entry: './app/assets/frontend/main.jsx',
    output: {
      path: __dirname + '/app/assets/javascripts',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
          }
        }
      ]
    }
  }


// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// const path = require('path')

// module.exports = async function(env, argv) {
//     const config = await createExpoWebpackConfigAsync(env, argv);
//     config.module.rules.forEach(r => {
//         if (r.oneOf) {
//             r.oneOf.forEach(o => {
//                 if (o.use && o.use.loader && o.use.loader.includes('babel-loader')) {
//                     o.include = [
//                         path.resolve('.'),
//                         path.resolve('node_modules/@ui-kitten/components'),
//                     ]
//                 }
//             })
//         }
//     })
//     return config;
// };