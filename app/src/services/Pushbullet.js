define(
    [],
    function() {
        /**
         * Sehr einfacher Wrapper um die Pushbullet-API.
         *
         * @type {{sendNotification: Function}}
         */
        var Pushbullet = {
            sendNotification: function(pushbulletAccessToken, message) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.pushbullet.com/v2/pushes', false);
                xhr.setRequestHeader('Authorization', 'Bearer ' + pushbulletAccessToken);
                xhr.setRequestHeader('Content-Type', 'application/json');

                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 4) {
                        var data = xhr.responseText;
                        try {
                            data = JSON.parse(data);
                        } catch (ex) {
                            console.log('error parsing', data);
                        }

                        if (data.error) {
                            console.log('Pushbullet error', data);
                        } else {
                            console.info(data);
                        }
                    }
                };
                var jsonString = '{"type":"note","title":"' + message.title + '","body":"' + message.body + '"}';
                xhr.send(jsonString);
            }
        };

        return Pushbullet;
    });
