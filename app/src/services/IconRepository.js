/**
 * Über diese Klasse lässt sich das Icon für Favicon und Meldungen anpassen.
 */
define(
    [],
    function() {

    /**
     * @typedef {Object} IconRepository
     * @type {{icon: string, setIcon: IconRepository.setIcon, getIcon: IconRepository.getIcon}} IconRepository
     */
    var IconRepository = {
        icon: '🍺', // Beer,

        setIcon: function(newIcon) {
            this.icon = newIcon;
        },

        getIcon: function() {
            return this.icon;
        }
    };
    return IconRepository;
});