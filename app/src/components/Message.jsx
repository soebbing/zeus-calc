/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    var Message = React.createClass({
        render: function() {
            var message = '';

            var numberOfWorkDaysInWeek = Time.getNumberOfWorkDaysInWeek();

            if (numberOfWorkDaysInWeek < 5) {
                message = '(' + (5 - numberOfWorkDaysInWeek) + ' Feiertag' + (numberOfWorkDaysInWeek < 4 ? 'e' : '') + '  berücksichtigt)'
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
