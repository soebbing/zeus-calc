define(
    ['src/services/Time'],
    function(Time) {

    var Repo = {

        // float-Zeitwert: Wieviel habe ich gearbeitet
        timeWorked: null,

        // Date-Objekt: Zu welchem Zeitpunkt habe ich soviel gearbeitet
        /** @var Date */
        timeWorkedAt: new Date(),

        /** @var {HTMLElement|null} Das HTML-Element in das die Applikation gerendert wird. */
        targetElement: null,

        /** @var {string} ID des Elements in der die Applikation gerendert wird */
        targetElementId: 'zeus-reporting',

        // Das LocalStorage-Prefix
        localStoragePrefix: 'settings-',

        /**
         * Erzeugt das Element in das die Applikation gerendert wird.
         * @returns {Element}
         */
        getTargetElement: function() {
            if (!this.targetElement) {
                var frame = this.getDocument();
                if (!frame.getElementById(this.targetElementId)) {
                    this.targetElement = frame.createElement('div');
                    this.targetElement.id = this.targetElementId;
                } else {
                    this.targetElement = frame.getElementById(this.targetElementId);
                }
            }

            return this.targetElement;
        },

        /**
         * @returns {HTMLDocument}
         */
        getDocument: function() {
            var frame = document.getElementById('FmeContent'); // ID des Frames mit der Zeit
            return frame.contentWindow.document;
        },

        /**
         * Eine Funktion die das Element mit der gearbeiteten Zeit zurück gibt.
         *
         * @returns {Element}
         */
        getTimeElement: function() {
            var element = null;
            try {
                element = this.getDocument().getElementsByClassName('Line')[2];
            } catch(ex) {
                throw new Exception('Time not found/Wrong formatting');
            }

            return element;
        },

        /**
         * Liefert die gearbeitete Zeit in float.
         *
         * @returns {number}
         */
        getTimeWorked: function() {
            if (!this.timeWorked) {
                this.timeWorkedAt = new Date();
                this.timeWorked = Time.timeToFloat(this.getTimeElement().innerHTML);
            }

            return this.timeWorked + (new Date().getTime() - this.timeWorkedAt.getTime()) / 1000 / 60 / 60;
        },

        /**
         * Liefert die Wochenarbeitszeit zurück.
         *
         * @returns {number}
         */
        getTimePerWeek: function() {
            return this.getTimePerWeekFromStorage() || 40;
        },

        /**
         * Lädt die Wochenarbeitszeit aus dem localstorage.
         *
         * @returns {number}
         */
        getTimePerWeekFromStorage: function() {
            return parseFloat(localStorage.getItem(this.localStoragePrefix + 'timePerWeek'));
        },

        /**
         * Ermittelt wieviele Stunden bis einschließlich dem aktuellen Tag gearbeitet werden muss.
         *
         * @returns {number}
         */
        getTimeNecessaryToToday: function() {
            var dayOfWeek = new Date().getDay();
            return dayOfWeek * this.getTimePerWeek()/5;
        },

        /**
         * Ermittelt wieviel mehr zusätzlich bis zum aktuellen Wochentag gearbeitet werden muss.
         *
         * @returns {number}
         */
        getTimeExtraToToday: function() {
            var timeExtraPerDay = ((this.getTimePerWeek()-5.5) / 4) - (this.getTimePerWeek()/5); // Soviel Zeit muss pro Tag vorgearbeitet werden
            var timeExtraToNow = timeExtraPerDay * new Date().getDay(); // Soviel Zeit muss bis zum aktuellen Wochentag vorgearbeitet werden
            if (new Date().getDay() == 5) { // Am Freitag müssen wir nicht mehr vorarbeiten
                timeExtraToNow = 0;
            }

            return timeExtraToNow;
        },

        /**
         * Speichert die Wochenarbeitszeit im localstorage.
         *
         * @param {number} timePerWeek
         */
        setTimePerWeek: function(timePerWeek) {
            if (isNaN(timePerWeek)) {
                timePerWeek = 0;
            }
            localStorage.setItem(this.localStoragePrefix + 'timePerWeek', timePerWeek);
        },

        /**
         * Speichert ob eine Notification angezeigt werden soll.
         *
         * @param {number} showNotification
         */
        setShowNotification: function(showNotification) {
            localStorage.setItem(this.localStoragePrefix + 'showNotification', showNotification);
        },

        /**
         * Liefert ob der Nutzer wünscht dass eine Notification zum Feierabend angezeigt werden soll.
         *
         * @returns {boolean}
         */
        getShowNotification: function() {
            var showNotification = localStorage.getItem(this.localStoragePrefix + 'showNotification');

            if (showNotification === null) {
                showNotification = false;
            }

            return showNotification && 'Notification' in window && Notification.permission !== 'denied';
        }
    };

    return Repo;
});
