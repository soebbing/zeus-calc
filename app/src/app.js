require.config({
    baseUrl: 'app/',
    paths: {
        'react':          'vendors/react/react-with-addons',
        'text':           'vendors/requirejs-text/text',
        'JSXTransformer': 'vendors/jsx-requirejs-plugin/js/JSXTransformer',
        'jsx':            'vendors/jsx-requirejs-plugin/js/jsx'
    },
    jsx: {
        fileExtension: '.jsx'
    }
});

require([
    'react',
    'jsx!src/components/Application'
    ], function(React, Application) {

    var css = document.createElement('link');
    css.rel = 'text/css';
    css.src = 'https://rawgit.com/soebbing/zeus-calc/react/app/css/app.css';

    document.getElementsByName('head')[0].appendChild(css);

    Application = React.createFactory(Application);

    React.render(Application({hoursWorked: 32}), document.getElementById('app'));
});