/** @jsx React.DOM */
define(['react'], function(React) {

    var Table = React.createClass({
        getInitialState: function(){
            return {name: ''}
        },
        change: function(e){
            this.setState({name: e.target.value})
        },
        render: function(){
            return (
                <div>
                Table hier
                </div>
                )
        }
    });

    return Table;
});
