const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        schedulePage: '/front/pages/SchedulePage/scripts/schedule.js',
        allNotesPage: '/front/pages/AllNotes/scripts/allNotes.js',
        analyticsPage: '/front/pages/AnalyticsPage/scripts/analytics.js',
        historyPage: '/front/pages/HistoryPage/scripts/history.js',
        settingsPage: '/front/pages/SettingsPage/scripts/settings.js'
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
        port: 8080,
    }
};
