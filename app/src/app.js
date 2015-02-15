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

    Application = React.createFactory(Application);
    React.render(Application({hoursWorked: 32}), document.getElementById('app'));

    loadStyles();
});

// Eine Funktion die das Element mit der gearbeiteten Zeit zurück gibt.
var getTimeElement = function() {
    var frame = document.getElementById('FmeContent'); // ID des Frames mit der Zeit
    var frameDocument = frame.contentWindow.document;
    return frameDocument.getElementsByClassName('Line')[2];
};

function loadStyles() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://rawgit.com/soebbing/zeus-calc/react/app/css/app.css';

    document.getElementsByTagName('head')[0].appendChild(css);
}


/**
 * Wandelt einen float-Zeitwert in einen lesbaren String um.
 *
 * @param {number} floatTime
 * @returns {string}
 */
function floatToTime(floatTime) {
    var parts = new Date(floatTime*3600*1000).toUTCString().split(' ')[4].split(':');
    return parts[0] + ':' + parts[1];
}

/**
 * Wandelt einen Uhrzeit-String (5:57) in einen Float-Wert zur Zeitberechnung um.
 *
 * @param {string} time
 * @returns {number}
 */
function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;

    return hours + minutes / 60;
}
