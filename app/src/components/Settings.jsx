/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        getInitialState: function() {
            return {
                visible: false
            }
        },

        onChangeTimePerWeek: function() {
            var newTimePerWeek = parseFloat(this.refs.timePerWeek.getDOMNode().value.trim());
            this.props.onTimePerWeekChange({
                timePerWeek: newTimePerWeek,
                timeWorked: this.props.timeWorked
            });
        },

        onChangeFridayWorktime: function() {
            var newFridayWorktime = this.refs.fridayWorktime.getDOMNode().value.trim();

            newFridayWorktime = newFridayWorktime.replace(/,/g, '.');

            this.props.onFridayWorktimeChange({fridayWorktime: newFridayWorktime});
        },

        onChangeShowNotification: function() {
            this.props.onShowNotificationChange({showNotification: this.refs.showNotification.getDOMNode().checked});
        },

        onChangeUseBreakAutomation: function() {
            this.props.onUseBreakAutomationChange({useBreakAutomation: this.refs.useBreakAutomation.getDOMNode().checked});
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
            this.onChangeTimePerWeek();
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

            // Nach 14 Uhr sollten die Pausen eh schon genommen worden sein, dann ist der Automat überflüssig
            var useBreakAutomationClasses = cx({
                'disabled': !(new Date().getHours() < 14)
            });

            return (
                <div className="settings-wrapper">
                    <div className={buttonClasses} ref="settingsButton" onClick={this.onSettingsClick}>Einstellungen</div>
                    <div className="settings" className={panelClasses} ref="settingsPanel">
                        <label>
                            <input type="text" maxLength="5" value={this.props.timePerWeek} ref="timePerWeek" placeholder="Stunden pro Woche" onChange={this.onChangeTimePerWeek} />
                            Wochenstunden
                        </label>
                        <label>
                            <input type="text" maxLength="5" value={this.props.fridayWorktime} ref="fridayWorktime" placeholder="Arbeitsdauer am Freitag" onChange={this.onChangeFridayWorktime} />
                            Arbeitsdauer am Freitag in Stunden (8-14 Uhr: 5,5h)
                        </label>
                        <label>
                            <input type="checkbox" ref="showNotification" checked={this.props.showNotification} onChange={this.onChangeShowNotification} />
                            Feierabendbenachrichtigung
                        </label>
                        <label className={useBreakAutomationClasses}>
                            <input type="checkbox" ref="useBreakAutomation" checked={this.props.useBreakAutomation} onChange={this.onChangeUseBreakAutomation} />
                            Pausenautomat <small>(Spätere Frühstücks- und Mittagspausen einrechnen)</small>
                        </label>
                    </div>
                </div>
                )
        }
    });

    return Settings;
});
