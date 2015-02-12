/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        onChange: function(){
            var newHoursPerWeek = parseFloat(this.refs.hoursPerWeek.getDOMNode().value.trim());

            if (isNaN(newHoursPerWeek)) {
                newHoursPerWeek = '';
            }
            this.props.onHoursPerWeekChange({hoursPerWeek: newHoursPerWeek});
        },
        componentDidMount: function() {
            this.onChange();
        },
        render: function(){
            return (
                <div>
                    <label>Settingsstunden: {this.props.hoursPerWeek}<br/>
                        <input type="text" maxLength="2" value={this.props.hoursPerWeek} ref="hoursPerWeek" placeholder="Stunden pro Woche" onChange={this.onChange} />
                    </label>
                </div>
                )
        }
    });

    return Settings;
});
