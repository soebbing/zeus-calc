/** @jsx React.DOM */
define([
    'react',
    'src/services/SettingsRepository',
    'src/services/Time'
    ], function(React, Settings, Time) {

    var Vacations = React.createClass({
        onChangeVacations: function () {
            this.props.onVacationsChange({
                vacations: {
                    date: this.props.vacations.date,
                    vacations: [
                        this.refs.mo.checked,
                        this.refs.tu.checked,
                        this.refs.we.checked,
                        this.refs.th.checked,
                        this.refs.fr.checked
                    ]
                }
            });
        },

        /**
         *
         * @param {number} dayId
         * @return {boolean}
         */
        isVacation: function(dayId) {
            return this.props.vacations.vacations[dayId] === true;
        },

        /**
         * Prüft ob der Wochentag mit gegebener dayId (in der Woche, dh. 0=Sonntag, 6=Samstag) ein Feiertag ist
         *
         * @param {string} dayId
         * @return {*}
         */
        isHoliday: function(dayId) {
            var today = new Date();

            if ((today.getDay() - 1) > dayId) { // Wenn der Wochentag bereits vorbei ist, dann deaktivieren wir den Tag
                return true;
            }

            today.setDate(today.getDate() + ((dayId + 1) - today.getDay()));

            return Time.isHoliday(today, Settings.getState());
        },

        render: function() {
            return (
                <div className="workday-wrapper">
                    <span className="vacations-title">
                        Urlaubstage diese Woche
                    </span>

                    <label>
                        <input type="checkbox" ref="mo" checked={this.isVacation(0)} disabled={this.isHoliday(0)} onChange={this.onChangeVacations} />
                        Mo
                    </label>
                    <label>
                        <input type="checkbox" ref="tu" checked={this.isVacation(1)} disabled={this.isHoliday(1)} onChange={this.onChangeVacations} />
                        Di
                    </label>
                    <label>
                        <input type="checkbox" ref="we" checked={this.isVacation(2)} disabled={this.isHoliday(2)} onChange={this.onChangeVacations} />
                        Mi
                    </label>
                    <label>
                        <input type="checkbox" ref="th" checked={this.isVacation(3)} disabled={this.isHoliday(3)} onChange={this.onChangeVacations} />
                        Do
                    </label>
                    <label>
                        <input type="checkbox" ref="fr" checked={this.isVacation(4)} disabled={this.isHoliday(4)} onChange={this.onChangeVacations} />
                        Fr
                    </label>
                </div>
                );
        }
    });

    return Vacations;
});
