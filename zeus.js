// Beginn Konfiguration

var colorLow = '#f00'; // Erstmal ist der Wert rot wenn zuwenig Stunden geleistet wurden.
var colorOk = '#F08900'; // Sind wir allgemein im Plus wird die Farbe Orange
var colorGreat = '#090'; // Wenn wir mehr haben als wir pro Tag extra machen müssen um am Freitag rechtzeitig Feierabend zu machen wird's grün!
var resultStyle = 'padding:5px 10px; margin:0 10px;color:%color%';

// Eine Funktion die das Element mit der gearbeiteten Zeit zurück gibt.
var getTimeElement = function() {
    var frame = document.getElementById('FmeContent'); // ID des Frames mit der Zeit
    var frameDocument = frame.contentWindow.document;
    return frameDocument.getElementsByClassName('Line')[2];
};

// Das Dokument das dass Element mit der gearbeiteten Zeit zurück gibt.
var getDocument = function() {
    var frame = document.getElementById('FmeContent'); // ID des Frames mit der Zeit
    return frame.contentWindow.document;
};

// Ende Konfiguration

// Zeitberechnungen
var dayOfWeek = new Date().getDay();
var hoursNecessaryToNow = dayOfWeek * 8;
var hoursExtraPerDay = ((40-5.5)/4)-8; // Soviel Zeit muss pro Tag vorgearbeitet werden
var hoursExtraToNow = hoursExtraPerDay * new Date().getDay(); // Soviel Zeit muss bis zum aktuellen Wochentag vorgearbeitet werden
if (new Date().getDay() == 5) { // Am Freitag müssen wir nicht mehr vorarbeiten
    hoursExtraToNow = 0;
}
var timeSpan = getTimeElement(); // Auslesen des eigentlichen Wertes
if (timeSpan) {
    var timeDone = timeStringToFloat(timeSpan.innerHTML);
    var timeDiff = timeDone - hoursNecessaryToNow;
    var span = getDocument().createElement('span');
    var content = '-';
    var color = colorLow;
    content = content + floatToTime(Math.round(Math.abs(timeDiff)*100)/100) + '';

    // > 0 Heisst: Wir haben das soll für heute erfüllt.
    if (timeDiff > 0 ) {
        content = '+';
        content = content + floatToTime(Math.round(timeDiff*100)/100) + '';
        color = colorOk;
        // Ab diesem Punkt haben wir diese Woche genug Stunden um Freitag früher Feierabend zu machen
        if (timeDiff > hoursExtraToNow || timeDone > 40) {
            color = colorGreat;
            content += ' (' + floatToTime(Math.round((timeDiff - hoursExtraToNow)*100)/100) + ' Extra)';
        } else {
            content += ' (noch ' + floatToTime(Math.round((hoursExtraToNow-timeDiff)*100)/100) + ' )';
        }
    }

    span.setAttribute('style', resultStyle.replace('%color%', color));
    span.innerHTML = content;
    timeSpan.appendChild(span);
} else {
    alert('Stunden nicht gefunden. Bist Du auf der richtigen Seite?');
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
