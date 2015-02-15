/** @jsx React.DOM */
define(['react'], function(React) {

    var Graph = React.createClass({
        render: function(){

            var colorLow = '#f00'; // Erstmal ist der Wert rot wenn zuwenig Stunden geleistet wurden.
            var colorOk = '#F08900'; // Sind wir allgemein im Plus wird die Farbe Orange
            var colorGreat = '#090';

            var color = colorLow;

            var completed = this.props.hoursWorked/this.props.hoursPerWeek*100;
            if (completed < 0) {
                completed = 0;
            }
            if (completed > 100) {
                completed = 100;
            }

            if (completed > 30) {
                color = colorOk;
            }

            if (completed > 30) {
                color = colorGreat;
            }

            var style = {
                backgroundColor: this.props.color || color,
                width: completed + '%',
                transition: "width 1000ms",
                height: 20
            };

            return (
                <div className="progressbar-container">
                    <div className="progressbar-progress" style={style}>
                        {this.props.hoursWorked}h/{this.props.hoursPerWeek}
                    </div>
                </div>
            );
        }
    });

    return Graph;
});
