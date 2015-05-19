/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    var Message = React.createClass({
        render: function() {
            var message;

            if (this.props.timeWorked < this.props.timeNecessary) {
                var timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                var currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = '🍺 '+ Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' +
                Time.floatToTime(timeLeft) + 'h, min. ' +
                Time.floatToTime(this.props.timeNecessary - this.props.timeWorked) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                var timeLeft = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked;
                var currentTime = Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes());

                message = '🍺 '+ Time.floatToTime(currentTime + timeLeft) + ' Uhr (noch ' + Time.floatToTime(timeLeft) + 'h)';
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                message = '🍺! (+'+ Time.floatToTime(Math.abs((this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeWorked)) + 'h)';
            }

            return (
                <div className="message">
                    {message}
                </div>
            )
        }
    });

    return Message;
});
