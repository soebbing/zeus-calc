/** @jsx React.DOM */
define([
    'react',
    'src/services/SettingsRepository',
    'src/services/Time'], function(React, Settings, Time) {

    var Message = React.createClass({
        render: function() {
            var message = '';

            var numberOfWorkDaysInWeek = Time.getNumberOfWorkDaysInWeek(Settings.getVacations());

            if (numberOfWorkDaysInWeek < 5) {
                message = '(' + (5 - numberOfWorkDaysInWeek) + ' Feier-/Urlaubstag' + (numberOfWorkDaysInWeek < 4 ? 'e' : '') + '  berücksichtigt)'
            }

            return (
                <div className="comment">
                    {message}
                </div>
                )
        }
    });

    return Message;
});
