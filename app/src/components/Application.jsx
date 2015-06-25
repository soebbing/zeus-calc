/** @jsx React.DOM */
define([
    'react',
    'src/services/Time',
    'jsx!src/components/Graph',
    'jsx!src/components/Message',
    'jsx!src/components/Settings',
    'jsx!src/components/Title',
    'jsx!src/components/Favicon'
], function (React, Time, Graph, Message, Settings, Title, Favicon) {
    var Application = React.createClass({
        getInitialState: function () {
            var that = this;

            // Vor dem Ende der Seite setzen wir den Status "nicht eingeloggt" damit das Favicon grau wird.
            window.addEventListener('beforeunload', function(event) {
                that.setState({
                    isLoggedIn: false
                });
            }, false);

            return {
                notificationShownInSession: false,
                settings: this.props.settings,
                isLoggedIn: this.props.settings.isLoggedIn(),
                useBreakAutomation: this.props.settings.getUseBreakAutomation(),
                fridayWorktime: this.props.settings.getFridayWorktime(),
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
         *
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

        /**
         * Behandelt Änderungen der Freitaglichen Arbeitszeit.
         *
         * @param {Event} e
         */
        handleFridayWorktimeChange: function(e) {
            this.state.settings.setFridayWorktime(e.fridayWorktime);

            this.setState({
                fridayWorktime: this.props.settings.getFridayWorktime(),
                timePerWeek: this.props.settings.getTimePerWeek(),
                timeWorked: this.props.settings.getTimeWorked(),
                timeNecessary: this.props.settings.getTimeNecessaryToToday(),
                timeExtraToNow: this.props.settings.getTimeExtraToToday()
            });
        },

        /**
         * Behandelt Änderungen bzgl. ob Pausen automatisch eingerechnet werden sollen.
         *
         * @param {Event} e
         */
        handleUseBreakAutomationChange: function(e) {
            this.state.settings.setUseBreakAutomation(e.useBreakAutomation);

            this.setState({
                useBreakAutomation: this.props.settings.getUseBreakAutomation(),
                fridayWorktime: this.props.settings.getFridayWorktime(),
                timePerWeek: this.props.settings.getTimePerWeek(),
                timeWorked: this.props.settings.getTimeWorked(),
                timeNecessary: this.props.settings.getTimeNecessaryToToday(),
                timeExtraToNow: this.props.settings.getTimeExtraToToday()
            });
        },

        /**
         * Behandelt Änderungen des Status ob eine Benachrichtigung angezeigt werden soll.
         *
         * @param {Event} e
         */
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
            if (this.props.settings.isLoggedIn()) {
                window.setInterval(this.handleTimeWorkedChange, 10000);
            }
        },

        render: function () {
            return (
                <div className="zeus-reporting-wrapper">
                    <h1>🍺 Feierabendvorhersage</h1>
                    <Graph timeNecessary={this.state.timeNecessary}
                        timeNecessaryYesterday={this.props.settings.getTimeNecessaryToYesterday()}
                        timeExtraToNow={this.state.timeExtraToNow}
                        timeWorked={this.state.timeWorked}
                        isLoggedIn={this.state.isLoggedIn} />
                    <Message />
                    <Settings timePerWeek={this.state.timePerWeek}
                        timeWorked={this.state.timeWorked}
                        fridayWorktime={this.state.fridayWorktime}
                        onFridayWorktimeChange={this.handleFridayWorktimeChange}
                        onTimePerWeekChange={this.handleTimePerWeekChange}
                        showNotification={this.state.showNotification}
                        onShowNotificationChange={this.handleShowNotificationChange}
                        useBreakAutomation={this.state.useBreakAutomation}
                        onUseBreakAutomationChange={this.handleUseBreakAutomationChange} />
                    <Title timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timeWorked={this.state.timeWorked} />
                    <Favicon timeNecessary={this.state.timeNecessary}
                        timeExtraToNow={this.state.timeExtraToNow}
                        timeWorked={this.state.timeWorked}
                        isLoggedIn={this.state.isLoggedIn} />
                </div>
            )
        }
    });

    return Application;
});
