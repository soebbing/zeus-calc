/** @jsx React.DOM */
define([
    'react',
    'src/services/Time'], function(React, Time) {

    var Favicon = React.createClass({
        render: function() {
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

            var canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 14;

            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            ctx = canvas.getContext('2d');
            ctx.font = 'bold 15px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText('🍺', 15, 18, 18);

            var favicon = document.getElementById('zeus-favicon');
            if (!favicon) {
                favicon = document.createElement('link');
                favicon.id = 'zeus-favicon';
                //favicon.type = 'image/png';
                favicon.rel = 'shortcut icon';
                document.getElementsByTagName('head')[0].appendChild(favicon);
            }

            favicon.href = canvas.toDataURL('image/png');

            return (<span />);
        }
    });

    return Favicon;
});
