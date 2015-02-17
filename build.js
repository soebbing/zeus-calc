({
    mainConfigFile: 'app/src/app.js',

    stubModules: ['jsx'],

    modules: [
        {
            name: "src/app",
            exclude: ["react", "JSXTransformer", "text"]
        }
    ],
    baseUrl : "app",
    dir: "dist/",
    removeCombined: true,
    keepBuildDir: false,
    optimize: "uglify",
    include: "app/src/services",
})