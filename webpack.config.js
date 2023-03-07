const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        schedulePage: '/pages/SchedulePage/scripts/schedule.js',
        allNotesPage: '/pages/AllNotes/scripts/allNotes.js',
        historyPage: '/pages/HistoryPage/scripts/history.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '')
        },
        hot: true,
        port: 8080,
    },
    watch: true
};
