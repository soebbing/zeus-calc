/** @jsx React.DOM */
define([
    'react',
    'jsx!src/components/Graph',
    'jsx!src/components/Table',
    'jsx!src/components/Settings'
    ], function(React, Graph, Table, Settings) {
    Graph    = React.createFactory(Graph);
    Table    = React.createFactory(Table);
    Settings = React.createFactory(Settings);

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
        return (
            <div>
                <h1>Zeiterfassung</h1>
                <Graph timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timeWorked={this.state.timeWorked} />
                <Table timeNecessary={this.state.timeNecessary} timeExtraToNow={this.state.timeExtraToNow} timePerWeek={this.state.timePerWeek} timeWorked={this.state.timeWorked} />
                <Settings timePerWeek={this.state.timePerWeek} timeWorked={this.state.timeWorked} onTimePerWeekChange={this.handleTimePerWeekChange} />
            </div>
        )
      }
    });

    return Application;
});
