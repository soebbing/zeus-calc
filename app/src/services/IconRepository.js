/**
 * Über diese Klasse lässt sich das Icon für Favicon und Meldungen anpassen.
 */
define(
    [],
    function() {

    var Icons = {
        icon: '🍺', // Beer,

        setIcon: function(newIcon) {
            this.icon = newIcon;
        },

        getIcon: function() {
            return this.icon;
        }
    };
    return Icons;
});