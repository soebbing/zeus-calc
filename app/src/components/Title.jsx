/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    /**
     * @typedef {Object} Title
     */
    var Title = React.createClass({

        render: function() {
            var timeLeft, currentTime, message;

            if (this.props.timeWorked < this.props.timeNecessary) {
                timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = Time.floatToTime(currentTime + timeLeft) + ' Uhr (' + Time.floatToTime(timeLeft) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                message = '(+'+ Time.floatToTime(Math.abs((this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked)) + 'h)';
            }

            if (!this.props.isLoggedIn) { // Wenn wir nicht eingeloggt sind, dann macht auch die Ausgabe keinen Sinn
                message = 'Du bist nicht eingebucht!';
            }

            document.title = message;

            return (
                <span />
            );
        }
    });

    return Title;
});
