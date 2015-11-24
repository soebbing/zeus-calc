/** @jsx React.DOM */
define([
    'react',
    'src/services/Time',
    'src/services/IconRepository'], function(React, Time, Icon) {

    /**
     * @typedef {Object} GraphContent
     */
    var GraphContent = React.createClass({
        render: function() {
            var message,
                timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked,
                currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

            if ((this.props.timeWorked - this.props.timeNecessaryYesterday) < 0) {
                message = Icon.getIcon() + ' ' + Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h, Aufarbeitung von gestern)';
            } else if (this.props.timeWorked < this.props.timeNecessary) {
                message = Icon.getIcon() + ' ' + Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h';

                // Freitags sind beide Werte gleich, da kann man sich den zweiten Teil sparen.
                if (timeLeft > (this.props.timeNecessary - this.props.timeWorked)) {
                    message += ', min. ' + Time.floatToTime(this.props.timeNecessary - this.props.timeWorked) + 'h';
                }
                message += ')';
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                message = Icon.getIcon() + ' '+ Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                message = Icon.getIcon() + '! (+'+ Time.floatToTime(Math.abs((this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked)) + 'h)';
            }

            var className = 'graph-content';
            if (!this.props.isLoggedIn) { // Wenn wir nicht eingeloggt sind, dann macht auch die Ausgabe keinen Sinn
                message = 'Du bist nicht eingebucht!';
                className += ' warning';
            }

            return (
                <div className={className}>
                    {message}
                </div>
            )
        }
    });

    return GraphContent;
});
