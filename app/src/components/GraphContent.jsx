/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    var GraphContent = React.createClass({
        render: function() {
            var message,
                timeLeft,
                currentTime;

            if (this.props.timeWorked < this.props.timeNecessary) {
                timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = '🍺 '+ Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h';

                // Freitags sind beide Werte gleich, da kann man sich den zweiten Teil sparen.
                if (timeLeft > (this.props.timeNecessary - this.props.timeWorked)) {
                    message += ', min. ' + Time.floatToTime(this.props.timeNecessary - this.props.timeWorked) + 'h';
                }
                message += ')';
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = '🍺 '+ Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                message = '🍺! (+'+ Time.floatToTime(Math.abs((this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked)) + 'h)';
            }

            if (!this.props.isLoggedIn) { // Wenn wir nicht eingeloggt sind, dann macht auch die Ausgabe keinen Sinn
                message = '';
            }

            return (
                <div className="graph-content">
                    {message}
                </div>
            )
        }
    });

    return GraphContent;
});
