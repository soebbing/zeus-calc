/** @jsx React.DOM */
define([
    'react',
    'jsx!src/components/Graph',
    'jsx!src/components/Table',
    'jsx!src/components/Settings'
    ], function(React, Graph, Table, Settings) {
    var Application = React.createClass({
      getInitialState: function(){
        return {
            settings: this.props.settings,
            timeNecessary: this.props.settings.getTimeNecessaryToNow(),
            timeExtraToNow: this.props.settings.getTimeExtraToNow(),
            timePerWeek: this.props.settings.getTimePerWeek(),
            timeWorked: this.props.settings.getTimeWorked()
        }
      },
      handleTimePerWeekChange: function(e) {
          this.state.settings.setTimePerWeek(e.timePerWeek);

          this.setState({
              timePerWeek: e.timePerWeek,
              timeWorked: e.timeWorked,
              timeNecessary: this.props.settings.getTimeNecessaryToNow(),
              timeExtraToNow: this.props.settings.getTimeExtraToNow()});

      },
      componentDidMount: function() {
      },
      render: function() {
          // <Table timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timePerWeek={this.state.timePerWeek} timeWorked={this.state.timeWorked} />
        return (
            <div className="zeus-reporting-wrapper">
                <h1>🍺 Feierabendvorhersage</h1>
                <Graph timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timeWorked={this.state.timeWorked} />
                <Settings timePerWeek={this.state.timePerWeek} timeWorked={this.state.timeWorked} onTimePerWeekChange={this.handleTimePerWeekChange} />
            </div>
        )
      }
    });

    return Application;
});
