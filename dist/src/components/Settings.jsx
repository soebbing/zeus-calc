/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        onChange: function(){
            var timeWorked = this.refs.timeWorked.getDOMNode().value.trim();
            var newTimePerWeek = parseFloat(this.refs.timePerWeek.getDOMNode().value.trim());
            this.props.onTimePerWeekChange({timePerWeek: newTimePerWeek, timeWorked: timeWorked});
        },
        componentDidMount: function() {
            this.onChange();
        },
        render: function(){
            return (
                <div>
                    <label>
                        Geleistete Stunden
                        <input type="text" maxLength="5" value={this.props.timeWorked} ref="timeWorked" placeholder="Geleistete Stunden" onChange={this.onChange} />
                    </label>

                    <label>Wochenstunden
                        <input type="text" maxLength="5" value={this.props.timePerWeek} ref="timePerWeek" placeholder="Stunden pro Woche" onChange={this.onChange} />
                    </label>
                </div>
                )
        }
    });

    return Settings;
});
