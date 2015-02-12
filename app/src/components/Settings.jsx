/** @jsx React.DOM */
define(['react'], function(React) {

    var Settings = React.createClass({
        getInitialState: function(){
            return {name: ''}
        },
        change: function(e){
            this.setState({name: e.target.value})
        },
        render: function(){
            return (
                <div>
                Settings hier
                </div>
                )
        }
    });

    return Settings;
});
