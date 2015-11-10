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
    'src/services/SettingsRepository',
    'src/services/IconRepository'
    ], function(React, Application, SettingsRepository, Icon) {

    try { // Wir checken einmal ob wir auf der richtigen Seite sind...
        SettingsRepository.getTimeWorked()
    } catch(ex) {
        alert(ex.message);
        return;
    }

    // ZEUS versucht die Seite nach einer Weile auf die Logout-URL weiterzuleiten, das verhindern wir.
    window.clearTimeout(window['objWinTimeout'] || null);

    // Wir checken ob ein eigenes Icon gesetzt werden soll
    checkCustomIcon(Icon);

    Application = React.createFactory(Application); // Erzeugen der eigentlichen Applikation
    React.render(Application({
        settings: SettingsRepository
    }), createTargetElement(SettingsRepository));

    createBackdropElement(SettingsRepository); // Hintergrund erzeugen

    loadStyles(SettingsRepository); // Styles aus rawgit laden
});

/**
 * Prüft ob ein eigenes Icon benutzt werden soll
 * @param {IconRepository} Icon
 */
function checkCustomIcon(Icon) {
    var jsLink = window.document.getElementById('zeus-calc-src');
    if (jsLink.getAttribute('data-icon')) {
        var icon = jsLink.getAttribute('data-icon');
        Icon.setIcon(icon);
    }
}

/**
 * @param {SettingsRepository} SettingsRepository
 */
function loadStyles(SettingsRepository) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://rawgit.com/soebbing/zeus-calc/vacation/app/css/app.css';

    var frame = SettingsRepository.getDocument();
    frame.getElementsByTagName('head')[0].appendChild(css);
}

/**
 * Erzeugt ein neues DIV und hängt es an den Body des Ziel-Frames an.
 *
 * @param {SettingsRepository} SettingsRepository
 * @returns {HTMLElement}
 */
function createTargetElement(SettingsRepository) {
    var target = SettingsRepository.getTargetElement();
    var frame = SettingsRepository.getDocument();
    frame.getElementsByTagName('body')[0].appendChild(target);
    return target;
}

/**
 * Erzeugt ein DIV das als Hintergrund für die App dient.
 *
 * @param {SettingsRepository} SettingsRepository
 */
function createBackdropElement(SettingsRepository) {
    var frame = SettingsRepository.getDocument();
    var backdrop = frame.createElement('div');
    backdrop.id = 'zeus-reporting-backdrop';
    frame.getElementsByTagName('body')[0].appendChild(backdrop);
}