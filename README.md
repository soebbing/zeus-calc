# Zeus Arbeitszeitrechner

Dieses Bookmarklet berechnet die zu leistende/geleistete Arbeitszeit (auf Wochenbasis) die nötig ist, um am Freitag
pünktlich um 14 Uhr (oder wann auch immer Du schaffst) Feierabend zu machen.

## Installation

Erstelle ein neues Lesezeichen in Deinem Browser und hinterlege als URL den folgenden Code:

    javascript:(function(){var url='https://rawgit.com/soebbing/zeus-calc/master/dist/app.min.js';var jsCode=document.createElement('script');jsCode.setAttribute('data-icon','\uD83C\uDF7A');jsCode.setAttribute('data-main','/dist/src/app');jsCode.setAttribute('id','zeus-calc-src');jsCode.setAttribute('src',url+'?'+Math.random());document.body.appendChild(jsCode);}());

Das Attribut 'data-icon' kannst Du gegen ein anderes Unicode-Zeichen Deiner Wahl austauschen, es ersetzt dann das "Beer"-
Icon das als Standard benutzt wird. Suche unter http://www.fileformat.info/info/unicode/ ein passendes Zeichen aus und kopiere
den Wert der unter "Encodings / C/C++/Java source code" eingetragen ist. Zum Beispiel:

- &#127866; : \uD83C\uDF7A
- &#9728; : \u2600 (Sonne)
- &#x1f377; : \uD83C\uDF77 (Wein)
- &#127881; : \uD83C\uDF89 (Party Popper)
- &#128643; : \uD83D\uDE83 (Waggon)
- &#8962; : \u2302 (Home)
- &#127969; : \uD83C\uDFE1 (Haus mit Garten)

Du musst eventuell die JS-Datei auf einen eigenen Server legen und die URL in der "url"-Variable entsprechend anpassen.

## Anwendung

Um nun zu schauen ob Du für heute genug gearbeitet hast logge Dich in die Zeiterfassung ein, klicke auf "Stunden pro Woche"
und rufe Dein Lesezeichen auf. Es erscheint nun ein Balken mit Deinem Wochenarbeitszeitstatus:

- Rot: (negativer Wert) Die voraussichtliche Uhrzeit für den Feierabend (inkl. der für Freitag nötigen Zeit) wird angezeigt,
zusammen mit der heut mindestens noch zu leistenden Arbeitszeit (idR. 8h/Tag).
- Orange: Du hast das Soll (idR. 8h/Tag) erfüllt, es reicht aber noch nicht um Freitag rechtzeitig zu gehen. Die Uhrzeit für
den Feierabend und die noch fehlende Zeit wird Dir angezeigt.
- Grün: Glückwunsch! Du kannst Freitag um 14 Uhr Feierabend machen! Es wird die "überschüssige" Zeit angezeigt.

Die Werte werden fortlaufend aktualisiert, es ist also nicht nötig die Seite neu zu laden.

Darüber hinaus wird der aktuelle Status auch in der Titelleiste angezeigt und im Favicon angedeutet. Damit kannst Du 
Deine Restarbeitszeit im Blick halten ohne den entsprechenden Browsertab anzusteuern. Sogar im angehefteten (Chrome), bzw. 
angepinnten (FF) Modus lässt sich über die Farbe des Favicons (dass der Farbe des Fortschrittsbalkens entspricht) der 
aktuelle Stand ableiten. Genaueres erfährst Du wenn Du mit der Maus auf dem Icon hoverst.

## Einstellungen

Hier können die Wochenarbeitszeit eingestellt und eine optionale Benachrichtigung zum Feierabend aktiviert werden.

## Entwicklung

Um das Javascript zu bauen führe folgendes auf der Konsole aus

    bower install
    r.js -o build.js

## Offene Punkte

- Auslagerung der Logik für das Auslesen der entsprechenden Tags der Seite in übergebbare Callback-Funktionen. Dadurch wird das Tool generischer und auch für andere Zeiterfassungen nutzbar.