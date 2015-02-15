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
            hoursPerWeek: 40,
            hoursWorked: this.props.hoursWorked
        }
      },
      handleHoursPerWeekChange: function(e) {
          this.setState({hoursPerWeek: e.hoursPerWeek, hoursWorked: e.hoursWorked})
      },
      componentDidMount: function() {
      },
      render: function(){
        return (
            <div>
                <h1>Zeiterfassung</h1>

                <Graph hoursPerWeek={this.state.hoursPerWeek} hoursWorked={this.state.hoursWorked} />
                <Table />
                <Settings hoursPerWeek={this.state.hoursPerWeek} hoursWorked={this.state.hoursWorked} onHoursPerWeekChange={this.handleHoursPerWeekChange} />
            </div>
        )
      }
    });

    return Application;
});
