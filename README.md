# Zeus Arbeitszeitrechner

Dieses Bookmarklet berechnet die zu leistende/geleistete Arbeitszeit (auf Wochenbasis) die nötig ist, um am Freitag
pünktlich um 14 Uhr (oder wann auch immer Du schaffst) Feierabend zu machen.

## Installation

Erstelle ein neues Lesezeichen in Deinem Browser und hinterlege als URL den folgenden Code:

    javascript:(function(){var url='https://rawgit.com/soebbing/zeus-calc/master/dist/app.min.js';var jsCode=document.createElement('script');jsCode.setAttribute('src',url+'?'+Math.random());document.body.appendChild(jsCode);}());

Du musst eventuell die JS-Datei auf einen eigenen Server legen und die URL in der "url"-Variable entsprechend anpassen.

## Anwendung

Um nun zu schauen ob Du für heute genug gearbeitet hast logge Dich in die Zeiterfassung ein, klicke auf "Stunden pro Woche"
und rufe Dein Lesezeichen auf. Es erscheint nun ein Balken mit Deinem Wochenarbeitszeitstatus:

- Rot: (negativer Wert) Die voraussichtliche Uhrzeit für den Feierabend (inkl. der für Freitag nötigen Zeit) wird angezeigt,
zusammen mit der heut mindestens noch zu leistenden Arbeitszeit (8h/Tag).
- Orange: Du hast das Soll (8h/Tag) erfüllt, es reicht aber noch nicht um Freitag rechtzeitig zu gehen. Die Uhrzeit für
den Feierabend und die noch fehlende Zeit wird Dir angezeigt.
- Grün: Glückwunsch! Du kannst Freitag um 14 Uhr Feierabend machen! Es wird die "überschüssige" Zeit angezeigt.

Die Werte werden fortlaufend aktualisiert, es ist also nicht nötig die Seite neu zu laden.

Darüber hinaus wird der aktuelle Status auch in der Titelleiste angezeigt und im Favicon angedeutet. Damit kannst Du 
Deine Restarbeitszeit im Blick halten ohne den entsprechenden Browsertab anzusteuern. Sogar im angehefteten (Chrome), bzw. 
angepinnten (FF) Modus lässt sich über die Farbe des Favicons (dass der Farbe des Fortschrittsbalkens entspricht) der 
aktuelle Stand ableiten.

## Einstellungen

Hier können die Wochenarbeitszeit eingestellt und eine optionale Benachrichtigung zum Feierabend aktiviert werden.

## Entwicklung

Um das Javascript zu bauen führe folgendes auf der Konsole aus

    bower install
    r.js -o build.js

## Offene Punkte

- Freitag als Urlaubstag markieren können, was dann dazu führt dass keine Vorarbeit nötig ist (In dem Zusammenhang:
In der Feiertagserkennungslogik eine Prüfung einführen ob ein möglicher Feiertag ein Freitag ist.)
- Eventuell: Andere Wochentage als Urlaubstage markieren können?
- Auslagerung der Logik für das Auslesen der entsprechenden Tags der Seite in übergebbare Callback-Funktionen. Dadurch wird das Tool generischer und auch für andere Zeiterfassungen nutzbar.