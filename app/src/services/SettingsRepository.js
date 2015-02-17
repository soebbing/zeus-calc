define(
    ['src/services/Time'],
    function(Time) {

    var Repo = {

        // Das HTML-Element in dem die gearbeitete Zeit steht
        timeElement: null,

        // Das LocalStorage-Prefix
        localStoragePrefix: 'settings-',

        /**
         * Eine Funktion die das Element mit der gearbeiteten Zeit zurück gibt.
         *
         * @returns {Element}
         */
        'getTimeElement': function() {
            var frame = document.getElementById('FmeContent'); // ID des Frames mit der Zeit
            var frameDocument = frame.contentWindow.document;
            return frameDocument.getElementsByClassName('Line')[2];
        },

        /**
         * Liefert die gearbeitete Zeit in float.
         *
         * @returns {number}
         */
        'getTimeWorked': function() {
            var timeElement = this.timeElement || this.getTimeElement();
            return Time.timeToFloat(timeElement.innerHTML);
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
        getTimeNecessaryToNow: function() {
            var dayOfWeek = new Date().getDay();
            return dayOfWeek * this.getTimePerWeek()/5;
        },

        /**
         * Ermittelt wieviel mehr zusätzlich bis zum aktuellen Wochentag gearbeitet werden muss.
         *
         * @returns {number}
         */
        getTimeExtraToNow: function() {
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
        }
    };

    return Repo;
});
