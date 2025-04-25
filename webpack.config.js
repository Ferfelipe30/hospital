const { query } = require('express');
const { url } = require('inspector');
const path = require('path');
const Stream = require('stream-browserify');
const { buffer } = require('stream/consumers');

module.exports = {
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
            buffer: require.resolve('buffer/'),
            fs: false, // no es necesario en el mavegador
            url: require.resolve('url/'),
            querystring: require.resolve('querystring-es3'),
            zlib: require.resolve('browserify-zlib'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            net: false,
        },
    },
};