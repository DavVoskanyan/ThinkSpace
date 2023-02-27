const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
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
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
};
