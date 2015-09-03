({
    mainConfigFile: 'app/src/app.js',

    stubModules: ['jsx'],

    paths: {
        requirejs: 'vendors/requirejs/require',
        react:     'vendors/react/react-with-addons',
        classnames:     'vendors/classnames/dedupe',
        text:           'vendors/requirejs-text/text',
        JSXTransformer: 'vendors/jsx-requirejs-plugin/js/JSXTransformer',
        jsx:            'vendors/jsx-requirejs-plugin/js/jsx',
        app:            'src/app'
    },
    baseUrl : 'app',
    out: 'dist/app.min.js',
    keepBuildDir: false,
    optimize: 'uglify',
    removeCombined: true,
    findNestedDependencies: true,
    include: ['requirejs', 'react', 'app', 'classnames', 'src/services/Time']
})