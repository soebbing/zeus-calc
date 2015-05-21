/** @jsx React.DOM */
define([
    'react',
    'src/services/Time',
    'jsx!src/components/Graph',
    'jsx!src/components/Table',
    'jsx!src/components/Settings'
], function (React, Time, Graph, Table, Settings) {
    var Application = React.createClass({
        getInitialState: function () {
            return {
                notificationShownInSession: false,
                settings: this.props.settings,
                showNotification: this.props.settings.getShowNotification(),
                timeNecessary: this.props.settings.getTimeNecessaryToToday(),
                timeExtraToNow: this.props.settings.getTimeExtraToToday(),
                timePerWeek: this.props.settings.getTimePerWeek(),
                timeWorked: this.props.settings.getTimeWorked()
            }
        },

        /**
         * Aktualisiert den State aller Attribute regelmäßig
         */
        handleTimeWorkedChange: function() {
            var notificationShownInSession = this.state.notificationShownInSession;

            if (this.props.settings.getTimeWorked() > (this.props.settings.getTimeNecessaryToToday() + this.props.settings.getTimeExtraToToday()) && // Wenn Feierabend ist...
                    'Notification' in window && // ...und im Browser die Notification API existiert...
                    Notification.permission === 'granted' && // ...und wir die Erlaubnis für Notifications haben...
                    this.state.settings.getShowNotification() && // ...und der Nutzer eine Notification wünscht...
                    !this.state.notificationShownInSession) { // ..und wir noch keine gezeigt haben
                new Notification('Schönen Feierabend!', {
                    icon: 'http://www.fancyicons.com/free-icons/103/glass/png/32/beer_glass_full_32.png',
                    body: 'Du hast diese Woche bisher ' + Math.round(this.props.settings.getTimeWorked()*10)/10 + 'h gearbeitet, komm gut nach Haus!'
                });
                notificationShownInSession = true;
            }

            this.setState({
                notificationShownInSession: notificationShownInSession,
                timePerWeek: this.props.settings.getTimePerWeek(),
                timeWorked: this.props.settings.getTimeWorked(),
                timeNecessary: this.props.settings.getTimeNecessaryToToday(),
                timeExtraToNow: this.props.settings.getTimeExtraToToday()
            });
        },

        /**
         * Aktualisiert die Attribute wenn sich das Feld "TimePerWeek" geändert hat.
         * @param {Event} e
         */
        handleTimePerWeekChange: function (e) {
            this.state.settings.setTimePerWeek(e.timePerWeek);

            this.setState({
                timePerWeek: e.timePerWeek,
                timeWorked: e.timeWorked,
                timeNecessary: this.props.settings.getTimeNecessaryToToday(),
                timeExtraToNow: this.props.settings.getTimeExtraToToday()
            });
        },

        handleShowNotificationChange: function(e) {
            if (e.showNotification) {
                if (!('Notification' in window)) {
                    alert('Dieser Browser unterstützt leider keine Benachrichtigungen.');
                    e.showNotification = false;
                }

                if (Notification.permission !== 'granted') { // Wenn wir noch keine Permission haben...
                    Notification.requestPermission(function (permission) { // ...dann fragen wir nach
                        // If the user accepts, let's create a notification
                        if (permission !== 'granted') {
                            alert('Bitte die Erlaubnis erteilen damit die Benachrichtigung angezeigt werden kann.');
                            e.showNotification = false;
                        }
                    });
                }
            }

            this.props.settings.setShowNotification(e.showNotification);

            this.setState({
                showNotification: this.props.settings.getShowNotification()
            });
        },

        /**
         * Startet ein Intervall, das alle 10 Sekunden den dargestellten Wert aktualisiert.
         */
        componentDidMount: function () {
            window.setInterval(this.handleTimeWorkedChange, 10000);
        },

        render: function () {
            // <Table timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timePerWeek={this.state.timePerWeek} timeWorked={this.state.timeWorked} />
            return (
                <div className="zeus-reporting-wrapper">
                    <h1>🍺 Feierabendvorhersage</h1>
                    <Graph timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timeWorked={this.state.timeWorked} />
                    <Settings timePerWeek={this.state.timePerWeek}
                        timeWorked={this.state.timeWorked}
                        onTimePerWeekChange={this.handleTimePerWeekChange}
                        showNotification={this.state.showNotification}
                        onShowNotificationChange={this.handleShowNotificationChange} />
                </div>
            )
        }
    });

    return Application;
});
