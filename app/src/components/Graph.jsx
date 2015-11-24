/** @jsx React.DOM */
define(['react',
    'jsx!src/components/GraphContent',
    'src/services/Time'], function(React, GraphContent, Time) {

    var Graph = React.createClass({
        getColor: function() {
            var colorVeryLow = '#9E3D9E'; // Wenn man weniger als das minimum gearbeitet hat (gestern also wesentlich früher Feierabend)
            var colorLow = 'rgba(255,0,0,0.65)'; // Erstmal ist der Wert rot wenn zuwenig Stunden geleistet wurden.
            var colorOk = '#F08900'; // Sind wir allgemein im Plus wird die Farbe orange
            var colorGreat = '#090'; // Ein Plus insgesamt wird grün
            var colorLoggedOut = '#CCC';

            var color = colorVeryLow;

            if ((this.props.timeWorked - this.props.timeNecessaryYesterday) >= 0) {
                color = colorLow;
            }

            if (this.props.timeWorked >= this.props.timeNecessary
                && this.props.timeWorked < this.props.timeNecessary + this.props.timeExtraToNow) {
                color = colorOk;
            }

            if (this.props.timeWorked >= this.props.timeNecessary + this.props.timeExtraToNow) {
                color = colorGreat;
            }

            if (!this.props.isLoggedIn) {
                color = colorLoggedOut;
            }

            return color;
        },

        render: function(){
            var color = this.getColor();

            // Differenz der Zeit die bis gestern und die bis heute gearbeitet werden muss.
            var timeDiff = (this.props.timeNecessary + this.props.timeExtraToNow) - this.props.timeNecessaryYesterday;

            if (timeDiff < 0) { // Am Wochenende ist timeDiff negativ, daher setzen wir das in solch einem Fall zurück.
                timeDiff = 0;
            }

            var completed = Math.round(((this.props.timeWorked - this.props.timeNecessaryYesterday) / timeDiff) * 100);

            if (completed < 0) {
                completed = 0;
            }
            if (completed > 100) {
                completed = 100;
            }

            var style = {
                backgroundColor: color,
                width: completed + '%'
            };

            var feierabendTime = Time.floatToTime(Time.timeToFloat(new Date().getHours() + '.' + new Date().getMinutes()) + (this.props.timeNecessary - this.props.timeWorked));
            var title = 'Nötig ' + (this.props.timeNecessary + this.props.timeExtraToNow) + 'h (normaler Feierabend: ' + feierabendTime + ' Uhr)';

            return (
                <div className="progressbar-container">
                    <div className="progressbar-progress" style={style} title={title}>
                        <GraphContent timeNecessary={this.props.timeNecessary}
                            timeNecessaryYesterday={this.props.timeNecessaryYesterday}
                            timeExtraToNow={this.props.timeExtraToNow}
                            timeWorked={this.props.timeWorked}
                            isLoggedIn={this.props.isLoggedIn} />
                    </div>
                </div>
            );
        }
    });

    return Graph;
});
