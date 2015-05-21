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

    try { // Wir checken einmal ob wir auf der richtigen Seite sind...
        SettingsRepository.getTimeWorked()
    } catch(ex) {
        alert(ex.message);
        return;
    }

    Application = React.createFactory(Application);
    React.render(Application({
            settings: SettingsRepository
        }
    ), createTargetElement(SettingsRepository));

    loadStyles(SettingsRepository);
});

/**
 * @param SettingsRepository
 */
function loadStyles(SettingsRepository) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://rawgit.com/soebbing/zeus-calc/master/app/css/app.css';

    var frame = SettingsRepository.getDocument();
    frame.getElementsByTagName('head')[0].appendChild(css);
}

/**
 *
 * @param SettingsRepository
 * @returns {HTMLElement}
 */
function createTargetElement(SettingsRepository) {
    var target = SettingsRepository.getTargetElement();
    var frame = SettingsRepository.getDocument();
    frame.getElementsByTagName('body')[0].appendChild(target);
    return target;
}