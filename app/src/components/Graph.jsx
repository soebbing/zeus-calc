/** @jsx React.DOM */
define(['react'], function(React) {

    var Graph = React.createClass({
        getInitialState: function(){
            return {name: ''}
        },
        change: function(e){
            this.setState({name: e.target.value})
        },
        render: function(){
            return (
                <div>
                    Graph hier
                </div>
                )
        }
    });

    return Graph;
});
