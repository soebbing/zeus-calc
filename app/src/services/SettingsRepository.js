define(
    ['src/services/Time',
    'jquery'],
    function(Time) {

    /**
     * @typedef {Object} SettingsRepository
     */
    var SettingsRepository = {
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
         * Liefert das Bundesland zurück. Wichtig für Feiertage.
         *
         * @return {string}
         */
        getState: function() {
            return 'NW';
        },

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
         * Liefert ob der Nutzer eingeloggt ist.
         *
         *  @returns {boolean}
         */
        isLoggedIn: function() {
            var frame = this.getDocument();

            var loggedInTerminal = frame.getElementById('uiCtlTerminal_uiLblTermDisplyLine1').innerHTML === 'Guten Morgen!';

            return loggedInTerminal &&
                this.timeWorkedAt.getDate() === new Date().getDate(); // Check auf Tageswechsel
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
            var lines = $('.Line', doc);
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

            var timeWorked = this.timeWorked + (new Date().getTime() - this.timeWorkedAt.getTime()) / 1000 / 60 / 60;

            return Math.ceil(timeWorked * 1000) / 1000;
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
         * Ermittelt wieviele Stunden bis einschließlich dem aktuellen Tag gearbeitet werden MUSS.
         *
         * @returns {number}
         */
        getTimeNecessaryToToday: function() {
            var dayOfWeek = new Date().getDay();

            if (dayOfWeek > 5) { // Wenn man am Wochenende arbeitet sollte das schon mal passen
                dayOfWeek = 5;
            }

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

            return Math.ceil(timeNecessary * 1000) / 1000;
        },

        /**
         * Ermittelt wieviele Stunden bis gestern gearbeitet werden mussten. Ist wichtig für die Berechnung des
         * prozentualen Wertes wieviel man gearbeitet hat.
         *
         * @return {number}
         */
        getTimeNecessaryToYesterday: function() {
            var yesterday = new Date().getDay() - 1;
            if (yesterday === 0) { // Montags gibt es nix zu berechnen.
                return 0;
            }

            var weekDays = Time.getNumberOfWorkDaysInWeek(this.getVacations());
            var freeHours = (5 - weekDays) * (this.getTimePerWeek() / 5); // Arbeitszeit an Feiertagen
            var workHoursWithoutFriday = this.getTimePerWeek() - this.getFridayWorktime();
            var timeExtraPerDay = ((workHoursWithoutFriday - freeHours) / (weekDays-1)) - (this.getTimePerWeek() / 5); // Soviel Zeit muss pro Tag vorgearbeitet werden

            var timeExtraToYesterday = timeExtraPerDay * yesterday; // Soviel Zeit muss bis zum aktuellen Wochentag vorgearbeitet werden

            return (yesterday * this.getTimePerWeek() / 5) + timeExtraToYesterday;
        },

        /**
         * Ermittelt wieviel mehr zusätzlich bis zum aktuellen Wochentag gearbeitet werden muss.
         *
         * @return {number}
         */
        getTimeExtraToToday: function() {
            var weekDays = Time.getNumberOfWorkDaysInWeek(this.getVacations());
            var freeHours = (5 - weekDays) * (this.getTimePerWeek() / 5); // Arbeitszeit an Feiertagen
            var workHoursWithoutFriday = this.getTimePerWeek() - this.getFridayWorktime();
            var timeExtraPerDay = ((workHoursWithoutFriday - freeHours) / (weekDays-1)) - (this.getTimePerWeek() / 5); // Soviel Zeit muss pro Tag vorgearbeitet werden

            var timeExtraToNow = timeExtraPerDay * new Date().getDay(); // Soviel Zeit muss bis zum aktuellen Wochentag vorgearbeitet werden

            if (new Date().getDay() >= 5) { // Am Freitag müssen wir nicht mehr vorarbeiten
                timeExtraToNow = 0;
            }

            return timeExtraToNow;
        },

        /**
         * Liefert die Arbeitsdauer die man am Freitag investieren will. Berücksichtig auch ob eventuell Freitag ein
         * Feiertag ist oder man dann Urlaub hat.
         *
         * @return {number}
         */
        getFridayWorktime: function() {
            var friday = new Date();
            friday.setDate(friday.getDate() - (friday.getDay() + 6));

            if (this.getVacations().vacations[4] ||
                    Time.isHoliday(friday, this.getState())
                ) { // Wenn Freitag Urlaub oder Feiertag ist, dann braucht nicht vorgearbeitet werden
                return 8.;
            }

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
         * @return {boolean}
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

        /**
         * Liefert zurück ob die Pausen automatisch berücksichtigt werden sollen.
         *
         * @return {boolean}
         */
        getUseBreakAutomation: function() {
            return this.useBreakAutomation;
        },

        /**
         * Speichert ob die Pausen automatisch berücksichtigt werden sollen.
         *
         * @param {boolean} useBreak
         */
        setUseBreakAutomation: function(useBreak) {
            this.useBreakAutomation = useBreak;
        },

        /**
         * Speichert ob eine Notification angezeigt werden soll.
         *
         * @param {string} pushbulletAccessToken
         */
        setPushbulletAccessToken: function(pushbulletAccessToken) {
            localStorage.setItem(this.localStoragePrefix + 'pushbulletAccessToken', pushbulletAccessToken);
        },

        /**
         * Liefert ob der Nutzer wünscht dass eine Notification zum Feierabend angezeigt werden soll.
         *
         * @return {boolean}
         */
        getPushbulletAccessToken: function() {
            return localStorage.getItem(this.localStoragePrefix + 'pushbulletAccessToken');
        },

        /**
         * Liefert ein Array der Urlaubstage in dieser Arbeitswoche.
         *
         * Die Anzahl der Urlaubstage in der Woche ändert die Anzahl der Tage an denen vorgearbeitet werden kann. Je
         * mehr Urlaubstage es gibt, in desto weniger Tagen muss die nötige Zeit vorgearbeitet werden.
         *
         * @return {Object}
         */
        getVacations: function() {
            var vacations = JSON.parse(localStorage.getItem(this.localStoragePrefix + 'vacations'));
            var toOld = true;

            if (vacations && vacations.date) {
                toOld = Math.ceil(Math.abs(new Date(vacations.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) > 6;
            }

            if (!vacations || toOld) {
                vacations = {
                    'date': new Date().getTime(),
                    //           Mo     Tu     We     Th     Fr
                    'vacations': [false, false, false, false, false]
                }
            }

            return vacations;
        },

        /**
         * Speichert das Array der Urlaubstage mit einem Zeitstempel im Localstorage.
         *
         * @param {Object} vacations
         */
        setVacations: function(vacations) {
            localStorage.setItem(this.localStoragePrefix + 'vacations', JSON.stringify(vacations));
        }
    };

    return SettingsRepository;
});
