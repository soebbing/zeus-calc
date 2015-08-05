define([], function () {

    var Time = {

        /**
         * Wandelt einen float-Zeitwert in einen lesbaren String um.
         *
         * @param {number} floatTime
         * @returns {string}
         */
        floatToTime: function (floatTime) {
            var parts = new Date(floatTime * 3600 * 1000).toUTCString().split(' ')[4].split(':');
            return parseInt(floatTime) + ':' + parts[1];
        },

        /**
         * Wandelt einen Uhrzeit-String (5:57) in einen Float-Wert zur Zeitberechnung um.
         *
         * @param {string} time
         * @returns {number}
         */
        timeToFloat: function (time) {
            var hoursMinutes = time.split(/[.:]/);
            var hours = parseInt(hoursMinutes[0], 10);
            var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;

            return hours + minutes / 60;
        },

        /**
         * Ermittelt die Anzahl der Arbeitstage in der aktuellen Woche (5-Anzahl Feiertage).
         *
         * @returns {number}
         */
        getNumberOfWorkDaysInWeek: function() {
            var today = new Date();
            var holidays = this.getHolidays(today.getYear() + 1900, 'NW');
            var workWeekDays = this.getWorkWeek(today);
            var numberOfWorkdays = 5;

            for (var i = 0; i < workWeekDays.length; i++) {
                if (holidays.contains(workWeekDays[i])) {
                    numberOfWorkdays--;
                }
            }

            return numberOfWorkdays;
        },

        /**
         *
         * @param {Date} today
         * @returns {Array}
         */
        getWorkWeek: function(today) {
            var workWeek = [];

            var workDay;
            for (var i=0; i < 5; i++) {
                workDay = new Date(today.setDate(today.getDate() - (today.getDay() - 1)));
                workDay.addDays(i);
                workWeek.push(this.toDateString(workDay));
            }

            return workWeek;
        },

        /**
         * Jahr: 2015
         * Bundesland:
         *   BW = Baden-Württemberg
         *   BY = Bayern
         *   BE = Berlin
         *   BB = Brandenburg
         *   HB = Bremen
         *   HH = Hamburg
         *   HE = Hessen
         *   MV = Mecklenburg-Vorpommern
         *   NI = Niedersachsen
         *   NW = Nordrhein-Westfalen
         *   RP = Rheinland-Pfalz
         *   SL = Saarland
         *   SN = Sachsen
         *   ST = Sachsen-Anhalt
         *   SH = Schleswig-Holstein
         *   TH = Thüringen
         *
         *   @param {Date} date
         *   @param {string} bula
         */
        isHoliday: function (date, bula) {
            return this.getHolidays(date.getYear()+1900, bula).contains(this.toDateString(date));
        },

        // Jahr = '2014', gibt ein Array mit den Feiertagen zurück im Format '2014-12-31'
        getHolidays: function (j, bula) {
            // Feste Feiertage in allen Bundeslaendern:
            var feiertage = [j + '-01-01', j + '-05-01', j + '-10-03', j + '-12-25', j + '-12-26'];

            var maria_himmelfahrt = j + '-08-15';
            var reformationstag = j + '-10-31';
            var allerheiligen = j + '-11-01';

            var bussbettag = this.getBussBettag(j);
            var easter_str = this.getOstern(j);
            var easter_date = new Date(easter_str.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
            var karfreitag = new Date(easter_date.getTime());
            karfreitag.addDays(-2);
            var ostermontag = new Date(easter_date.getTime());
            ostermontag.addDays(1);
            var christi_himmelfahrt = new Date(easter_date.getTime());
            christi_himmelfahrt.addDays(39);
            var pfingstsonntag = new Date(easter_date.getTime());
            pfingstsonntag.addDays(49);
            var pfingstmontag = new Date(easter_date.getTime());
            pfingstmontag.addDays(50);
            var fronleichnam = new Date(easter_date.getTime());
            fronleichnam.addDays(60);

            // wieder alle:
            feiertage = feiertage.concat([this.toDateString(karfreitag), this.toDateString(ostermontag), this.toDateString(christi_himmelfahrt), this.toDateString(pfingstmontag)]);

            // Jetzt Bundeslandspezifisch
            // Heilige 3 Koenige
            if (bula == 'BW' || bula == 'BY' || bula == 'ST') {
                feiertage.unshift(j + '-01-06');
            }

            if (bula == 'BB') {
                feiertage.unshift(easter_str);
                feiertage.unshift(this.toDateString(pfingstsonntag));
            }

            // Fronleichnam
            if (bula == 'BW' || bula == 'BY' || bula == 'HE' || bula == 'NW' || bula == 'RP' || bula == 'SL') {
                feiertage.unshift(this.toDateString(fronleichnam));
            }

            // Maria Himmelfahrt
            if (bula == 'SL') {
                feiertage.unshift(maria_himmelfahrt);
            }

            // Reformationstag
            if (bula == 'BB' || bula == 'MV' || bula == 'SN' || bula == 'ST' || bula == 'TH') {
                feiertage.unshift(reformationstag);
            }

            // Allerheiligen
            if (bula == 'BW' || bula == 'BY' || bula == 'NW' || bula == 'RP' || bula == 'SL') {
                feiertage.unshift(allerheiligen);
            }

            // Buss und Bettag
            if (bula == 'SN') {
                feiertage.unshift(bussbettag);
            }

            feiertage.sort();
            return feiertage;
        },

        // Magic Gauss, irgendwo gefunden, hoffe, es stimmt.
        getOstern: function (Y) {
            var C = Math.floor(Y / 100);
            var N = Y - 19 * Math.floor(Y / 19);
            var K = Math.floor((C - 17) / 25);
            var I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15;
            I = I - 30 * Math.floor((I / 30));
            I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11));
            var J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4);
            J = J - 7 * Math.floor(J / 7);
            var L = I - J;
            var M = 3 + Math.floor((L + 40) / 44);
            var D = L + 28 - 31 * Math.floor(M / 4);
            return Y + '-' + this.zeroPadding(M) + '-' + this.zeroPadding(D);
        },

        /**
         * Liefert den Buss- & Bettag für gegebenes Jahr.
         *
         * @param {int} jahr
         * @returns {string}
         */
        getBussBettag: function (jahr) {
            var weihnachten = new Date(jahr, 11, 25, 12, 0, 0);
            var dow = weihnachten.getDate();
            var tageVorWeihnachten = (((dow == 0) ? 7 : dow) + 21 );
            var bbtag = new Date(weihnachten.getTime());
            bbtag.addDays(-tageVorWeihnachten);
            var monat = this.zeroPadding(bbtag.getMonth() + 1);
            var tag = this.zeroPadding(bbtag.getDate());
            return jahr + '-' + monat + '-' + tag;
        },

        /**
         * Macht aus 1 => 01
         *
         * @param {int} number
         * @returns {string}
         */
        zeroPadding: function (number) {
            return (number < 10) ? '0' + number : number;
        },

        /**
         * Wandelt ein Date-Objekt in einen Datumsstring um yyy-mm-dd
         *
         * @param {Date} date
         * @returns {string}
         */
        toDateString: function (date) {
            var year = date.getYear() + 1900;
            var month = date.getMonth() + 1;
            month = this.zeroPadding(month);
            var day = this.zeroPadding(date.getDate());
            return year + '-' + month + '-' + day;
        }
    };

    // Erweitert Date um eine addDays()-Methode
    Date.prototype.addDays = function (days) {
        this.setTime(this.getTime()+(parseInt(days)*24*60*60*1000));
    };

    // Erweitert Array um eine contains()-Methode.
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    };

    return Time;
});
