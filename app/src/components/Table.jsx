/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    var Table = React.createClass({
        render: function() {
            var message;

            if (this.props.timeWorked < this.props.timeNecessary) {
                message = 'Puuh, noch ' + Time.floatToTime(this.props.timeNecessary-this.props.timeWorked) + 'h bis Feierabend. :(';
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                message = 'Ok, noch ' + Time.floatToTime((this.props.timeNecessary +  this.props.timeExtraToNow) -this.props.timeWorked) + 'h bis Feierabend. ^^';
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                message = 'Woah, schon mehr als nötig! (' + Time.floatToTime(Math.abs((this.props.timeNecessary + this.props.timeExtraToNow) -this.props.timeWorked)) + 'h)';
            }

            return (
                <div className="comment">
                    {message}
                </div>
                )
        }
    });

    return Table;
});
