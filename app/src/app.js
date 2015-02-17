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
    'jsx!src/components/Application',
    'src/services/SettingsRepository'
    ], function(React, Application, SettingsRepository) {

    SettingsRepository.timeElement = document.createElement('div');
    SettingsRepository.timeElement.innerHTML = '40';

    Application = React.createFactory(Application);
    React.render(Application({
            settings: SettingsRepository
        }
    ), document.getElementById('app'));

    loadStyles();
});

function loadStyles() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://rawgit.com/soebbing/zeus-calc/react/app/css/app.css';

    document.getElementsByTagName('head')[0].appendChild(css);
}
