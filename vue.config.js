module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/chat/' : '/chat/',
    configureWebpack: {
        devtool: "eval-source-map"
    },
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                options["transformAssetUrls"] = {
                    img: "src",
                    image: "xlink:href"
                };
                return options;
            });
    }
};