define([], function() {

    var Time = {

        /**
         * Wandelt einen float-Zeitwert in einen lesbaren String um.
         *
         * @param {number} floatTime
         * @returns {string}
         */
        floatToTime: function (floatTime) {
            var parts = new Date(floatTime*3600*1000).toUTCString().split(' ')[4].split(':');
            return parts[0] + ':' + parts[1];
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
        }

    };

    return Time;
});
