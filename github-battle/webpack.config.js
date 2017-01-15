module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
}
