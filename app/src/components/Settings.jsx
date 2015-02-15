/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        onChange: function(){
            var hoursWorked = parseFloat(this.refs.hoursWorked.getDOMNode().value.trim());

            if (isNaN(hoursWorked)) {
                hoursWorked = '';
            }
            var newHoursPerWeek = parseFloat(this.refs.hoursPerWeek.getDOMNode().value.trim());

            if (isNaN(newHoursPerWeek)) {
                newHoursPerWeek = '';
            }
            this.props.onHoursPerWeekChange({hoursPerWeek: newHoursPerWeek, hoursWorked: hoursWorked});
        },
        componentDidMount: function() {
            this.onChange();
        },
        render: function(){
            return (
                <div>
                    <label>
                        Geleistete Stunden
                        <input type="text" maxLength="5" value={this.props.hoursWorked} ref="hoursWorked" placeholder="Geleistete Stunden" onChange={this.onChange} />
                    </label>

                    <label>Wochenstunden
                        <input type="text" maxLength="5" value={this.props.hoursPerWeek} ref="hoursPerWeek" placeholder="Stunden pro Woche" onChange={this.onChange} />
                    </label>
                </div>
                )
        }
    });

    return Settings;
});
