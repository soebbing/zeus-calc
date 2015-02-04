# Zeus Arbeitszeitrechner

Dieses Bookmarklet berechnet die zu leistende/geleistete Arbeitszeit (auf Wochenbasis) die nötig ist, um am Freitag
pünktlich um 14 Uhr Feierabend zu machen.

## Installation und Anwendung

Erstelle ein neues Lesezeichen in Deinem Browser und hinterlege als URL den folgenden Code:

    javascript:(function(){var jsCode=document.createElement('script');jsCode.setAttribute('src','http://soebbi.de/zeus.js?'+Math.random());document.body.appendChild(jsCode);}());

Um nun zu schauen ob Du für heute genug gearbeitet hast logge Dich in die Zeiterfassung ein, klicke auf "Wochenarbeitszeit"
und rufe Dein Lesezeichen auf.

Neben der Wochenarbeitszeit erscheint dann ein neuer Wert der die Zeitdifferenz zur zum heutigen Wochentag nötigen Arbeitszeit darstellt.

- Rot: (negativer Wert) Solange musst Du noch arbeiten um 8h/Tag voll zu haben.
- Orange: Du hast das Soll (8h/Tag) erfüllt, es reicht aber noch nicht um Freitag rechtzeitig zu gehen.
- Grün: Glückwunsch! Du kannst Freitag um 14 Uhr Feierabend machen!