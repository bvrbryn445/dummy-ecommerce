const resolve = require('resolve')
const TerserPlugin = require('terser-webpack-plugin');

const { createWebpackDevConfig } = require('@craco/craco');

const cracoLessConfig = require('./craco.config.js');
const cracoLessWebpackConfig = createWebpackDevConfig(cracoLessConfig);
const defaultWebpackConfig = {
	entry: `${__dirname}/src/index.js`,
	output: {
		path: `${__dirname}/docs/build`,
		publicPath: '/build/',
		filename: 'bundle.js',
	},

	// generate different source maps for dev and production
	devtool: process.argv.indexOf('-p') === -1 ? 'eval-source-map' : 'source-map',

	module: {
		rules: [
			// use babel-loader for jsx and js files so all files are transpiled to es5
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
						],
					},
				},
			},
			// {
			// 	test: /\.js$/,
			// 	loader: 'source-map-loader',
			// },
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				// options: {
				// 	limit: 10000,
				// },
			},
			{
				test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
				loader: require.resolve('file-loader'),
			},
			{
				test: /\.less$/i,
				use: [
					// compiles Less to CSS
					'less-loader',
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	// required because the defaults for webpack -p don't remove multiline comments
	optimization:
		process.argv.indexOf('-p') === -1
			? {}
			: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							output: {
								comments: false,
							},
						},
						extractComments: false,
					}),
				],
			},

	// to mimic GitHub Pages serving 404.html for all paths
	// and test spa-github-pages redirect in dev
	devServer: {
		historyApiFallback: {
			rewrites: [{ from: /\//, to: '/404.html' }],
		},
	},
};

// combine both configs while the default webpack config cannot
// allow its existing properties to be overrided by the other config obj
const webpackConfig = Object.assign({}, cracoLessWebpackConfig, defaultWebpackConfig)
module.export = webpackConfig;