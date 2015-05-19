/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        getInitialState: function() {
            return {
                visible: false
            }
        },

        onChange: function() {
            var newTimePerWeek = parseFloat(this.refs.timePerWeek.getDOMNode().value.trim());
            this.props.onTimePerWeekChange({timePerWeek: newTimePerWeek, timeWorked: this.props.timeWorked});
        },

        /**
         * OnClick-Handler für den Settings-Link
         */
        onSettingsClick: function() {
            this.setState({
                visible: !this.state.visible
            });
        },

        componentDidMount: function() {
            this.onChange();
        },

        render: function(){
            var cx = React.addons.classSet;
            var buttonClasses = cx({
                'settings-switch': true,
                'closed': !this.state.visible,
                'open': this.state.visible
            });
            var panelClasses = cx({
                'settings': true,
                'hidden': !this.state.visible
            });

            return (
                <div className="settings-wrapper">
                    <div className={buttonClasses} ref="settingsButton" onClick={this.onSettingsClick}>Einstellungen</div>
                    <div className="settings" className={panelClasses} ref="settingsPanel">
                        <label>
                            <input type="text" maxLength="5" value={this.props.timePerWeek} ref="timePerWeek" placeholder="Stunden pro Woche" onChange={this.onChange} />
                            Wochenstunden
                        </label>
                    </div>
                </div>
                )
        }
    });

    return Settings;
});
