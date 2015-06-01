/** @jsx React.DOM */
define(['react',
    'jsx!src/components/GraphContent',
    'src/services/Time'], function(React, GraphContent, Time) {

    var Graph = React.createClass({

        render: function(){

            var colorLow = '#f00'; // Erstmal ist der Wert rot wenn zuwenig Stunden geleistet wurden.
            var colorOk = '#F08900'; // Sind wir allgemein im Plus wird die Farbe Orange
            var colorGreat = '#090';

            var color = colorLow;

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                color = colorOk;
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                color = colorGreat;
            }

            var completed = this.props.timeWorked/(this.props.timeNecessary+this.props.timeExtraToNow)*100;

            if (completed < 0) {
                completed = 0;
            }
            if (completed > 100) {
                completed = 100;
            }

            var style = {
                backgroundColor: this.props.color || color,
                width: completed + '%'
            };

            var feierabendTime = Time.floatToTime(Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes()) + (this.props.timeNecessary - this.props.timeWorked));
            var title = 'Nötig ' + (this.props.timeNecessary + this.props.timeExtraToNow) + 'h (normaler Feierabend: ' + feierabendTime + ' Uhr)';

            return (
                <div className="progressbar-container">
                    <div className="progressbar-progress" style={style} title={title}>
                        <GraphContent timeNecessary={this.props.timeNecessary} timeExtraToNow={this.props.timeExtraToNow} timeWorked={this.props.timeWorked} />
                    </div>
                </div>
            );
        }
    });

    return Graph;
});
