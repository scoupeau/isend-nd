var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    ferrom_soldado:'Zona soldada de un tubo',
    ferrom_sinsold:'zona sin soldadura de un tubo',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o caliente
    function (session) {
        //fcaliente es ferromagneticoencaliente fsinsold es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Estoy buscando una solución de NDT (No destructive Testing) para analizar defectos en producción en Tubo con Soldadura. Dinos por favor si tienes que Analizar la Zona Libre de soldadura o la Zona de Soldadura:',
            [DialogLabels.ferrom_soldado, DialogLabels.ferrom_sinsold],
            {
                maxRetries: 3,
                retryPrompt: 'Opción no válida'
            });
      },
        function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Demasiados intentos fallidos :( Pero no se preocupe, Vamos a intentar otra vez clasificar el material!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Fallo: %s', err.message);
            session.endDialog();
        });

          // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.ferrom_soldado:
                return session.beginDialog('fsoldado'); //llama ffriopuntosold.js etc
            case DialogLabels.ferrom_sinsold:
                return session.beginDialog('fsinsold'); //fhilofrio
        }
       
    }
    
];

