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
        return {name: ''}
      },
      change: function(e){
        this.setState({name: e.target.value})
      },
      render: function(){
        return (
            <div>
                <Graph />
                <Table/>
                <Settings/>
              <div>
                <input type="text" name="name" onChange={this.change} />
                <h1> Hello {this.state.name}!!!</h1>
              </div>
            </div>
        )
      }
    });

    return Application;
});
