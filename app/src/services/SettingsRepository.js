define(
    ['src/services/Time'],
    function(Time) {

    var Repo = {
        /**
         * Der Stand von wann die Arbeitszeitinformationen sind
         *
         * @var {Date}
         */
        timeState: new Date(),

        /**
         * Wieviel habe ich gearbeitet
         *
         * @var {float}
         */
        timeWorked: null,

        /**
         * Zu welchem Zeitpunkt habe ich soviel gearbeitet
         *
         * @var {Date}
         */
        timeWorkedAt: new Date(),

        /**
         * Definiert ob das System versuchen soll Pausenzeiten automatisch in die Berechnungen einzubeziehen
         *
         * @var {boolean}
         */
        useBreakAutomation: true,

        /** @var {HTMLElement|null} Das HTML-Element in das die Applikation gerendert wird. */
        targetElement: null,

        /** @var {string} ID des Elements in der die Applikation gerendert wird */
        targetElementId: 'zeus-reporting',

        /**
         * Das localstorage-Prefix
         *
         * @var {string}
         */
        localStoragePrefix: 'settings-',

        /**
         * Erzeugt das Element in das die Applikation gerendert wird.
         *
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
         *  @returns {boolean}
         */
        isLoggedIn: function() {
            var frame = this.getDocument();
            return frame.getElementById('uiCtlTerminal_uiLblTermDisplyLine1').innerHTML === 'Guten Morgen!';
        },

        /**
         * Eine Funktion die das Element mit der gearbeiteten Zeit zurück gibt.
         *
         * @returns {Element}
         */
        getTimeElement: function() {
            var doc = this.getDocument();
            if (!doc) {
                throw new Error('Uhrzeit nicht gefunden. Falsche Seite?')
            }
            var lines = doc.getElementsByClassName('Line');
            if (lines.length < 3) {
                throw new Error('Uhrzeit nicht gefunden. Falsche Seite?')
            }
            return lines[2]
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
            var timeNecessary = dayOfWeek * this.getTimePerWeek() / 5;

            // Bei allen Wochentagen vor Freitag rechnen wir noch die Pausen drauf
            if (this.timeState.getDay() < 5 && this.getUseBreakAutomation()) {
                if (this.timeState.getHours() < 10) {
                    timeNecessary += 0.75;
                }
                if (this.timeState.getHours() < 14) {
                    timeNecessary += 0.5;
                }
            }

            // Bei allen Wochentagen vor Freitag rechnen wir noch die Pausen drauf
            if (this.timeState.getDay() == 5 && this.timeState.getHours() < 10 && this.getUseBreakAutomation()) {
                timeNecessary += 0.5;
            }

            return timeNecessary;
        },

        /**
         * Ermittelt wieviel mehr zusätzlich bis zum aktuellen Wochentag gearbeitet werden muss.
         *
         * @returns {number}
         */
        getTimeExtraToToday: function() {
            var weekDays = Time.getNumberOfWorkDaysInWeek();
            var freeHours = (5 - weekDays) * (this.getTimePerWeek() / 5); // Arbeitszeit an Feiertagen
            var workHoursWithoutFriday = this.getTimePerWeek() - this.getFridayWorktime();
            var timeExtraPerDay = ((workHoursWithoutFriday - freeHours) / (weekDays-1)) - (this.getTimePerWeek() / 5); // Soviel Zeit muss pro Tag vorgearbeitet werden

            var timeExtraToNow = timeExtraPerDay * new Date().getDay(); // Soviel Zeit muss bis zum aktuellen Wochentag vorgearbeitet werden

            if (new Date().getDay() == 5) { // Am Freitag müssen wir nicht mehr vorarbeiten
                timeExtraToNow = 0;
            }

            return timeExtraToNow;
        },

        /**
         * Liefert die Arbeitsdauer die man am Freitag investieren will.
         *
         * @returns {number}
         */
        getFridayWorktime: function() {
            var fridayWorktime = localStorage.getItem(this.localStoragePrefix + 'fridayWorktime');

            if (fridayWorktime === null || isNaN(parseFloat(fridayWorktime))) {
                fridayWorktime = 5.5;
            }

            return parseFloat(fridayWorktime);
        },

        /**
         * Speichert die Arbeitsdauer die man am Freitag investieren will im localstorage.
         *
         * @param {number} fridayWorktime
         */
        setFridayWorktime: function(fridayWorktime) {
            if (isNaN(fridayWorktime)) {
                fridayWorktime = 5.5;
            }
            localStorage.setItem(this.localStoragePrefix + 'fridayWorktime', fridayWorktime);
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
            } else {
                showNotification = showNotification !== 'false'; // Aus dem Localstorage fallen die nur als strings heraus
            }

            return showNotification && 'Notification' in window && Notification.permission !== 'denied';
        },

        getUseBreakAutomation: function() {
            return this.useBreakAutomation;
        },

        setUseBreakAutomation: function(useBreak) {
            this.useBreakAutomation = useBreak;
        }
    };

    return Repo;
});
