

var frame = document.getElementById('FmeContent');
var frameDocument = frame.contentWindow.document;
var dayOfWeek = new Date().getDay();
var hoursNecessaryToNow = dayOfWeek * 8;
var hoursExtraPerDay = ((40-5.5)/4)-8;
var hoursExtraToNow = hoursExtraPerDay * new Date().getDay();
if (new Date().getDay() == 5) { // Am Freitag müssen wir nicht mehr vorarbeiten
    hoursExtraToNow = 0;
}
var timeSpan = frameDocument.getElementsByClassName('Line')[2];
if (timeSpan) {
    var timeDone = timeStringToFloat(timeSpan.innerHTML);
    var timeDiff = timeDone - hoursNecessaryToNow;
    var span = frameDocument.createElement('span');
    var content = '-';
    var color = '#f00'; // Erstmal ist der Wert rot wenn zuwenig Stunden geleistet wurden.
    content = content + floatToTime(Math.round(Math.abs(timeDiff)*100)/100) + '';

    // > 0 Heisst: Wir haben das soll für heute erfüllt.
    if (timeDiff > 0 ) {
        content = '+';
        content = content + floatToTime(Math.round(timeDiff*100)/100) + '';
        color = '#F08900'; // Sind wir allgemein im Plus wird die Farbe Orange
        // Ab diesem Punkt haben wir diese Woche genug Stunden um Freitag früher Feierabend zu machen
        if (timeDiff > hoursExtraToNow || timeDone > 40) {
            color = '#090'; // Wenn wir mehr haben als wir pro Tag extra machen müssen um am Freitag rechtzeitig Feierabend zu machen wird's grün!
            content += ' (' + floatToTime(Math.round((timeDiff - hoursExtraToNow)*100)/100) + ' Extra)';
        } else {
            content += ' (noch ' + floatToTime(Math.round((hoursExtraToNow-timeDiff)*100)/100) + ' )';
        }
    }

    span.setAttribute('style', 'padding:5px 10px; margin:0 10px;color:' + color);
    span.innerHTML = content;
    timeSpan.appendChild(span);
} else {
    alert('Stunden nicht gefunden');
}

function floatToTime(float) {
    var parts = new Date(float*3600*1000).toUTCString().split(' ')[4].split(':');
    var result = parts[0] + ':' + parts[1];
    return result;
}

function timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/)
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;

    return hours + minutes / 60;
}
