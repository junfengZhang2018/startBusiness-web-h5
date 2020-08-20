const path = require('path')
// const withCSS = require("./next-css.config.js")
const withCSS = require("@zeit/next-css")
const withSass = require("@zeit/next-sass")

module.exports = withCSS(withSass({
    cssModules: false,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "./"),
            "@component": path.resolve(__dirname, "./component"),
            "@pages": path.join(__dirname, ".", "pages"),
            "@layouts": path.join(__dirname, ".", "layouts"),
            "@public": path.join(__dirname, ".", "public"),
            "@utils": path.join(__dirname, ".", "utils")
        };
        return config;
    }
}))
