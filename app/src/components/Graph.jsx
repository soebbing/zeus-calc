/** @jsx React.DOM */
define(['react'], function(React) {

    var Graph = React.createClass({
        render: function(){
            return (
                <div>
                    <h4>Hier kommt ein Graph</h4>
                    <div className="hoursPerWeek">
                        <span>Stunden pro Woche: </span><span>{this.props.hoursPerWeek}</span>
                    </div>
                    <div className="hoursWorked">
                        <span>Stunden gearbeitet: </span><span>{this.props.hoursWorked}</span>
                    </div>
                </div>
                )
        }
    });

    return Graph;
});
