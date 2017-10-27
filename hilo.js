var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    ferrom_caliente:'hilo en caliente (alambrón)',
    ferrom_hilofrio:'hilo en frio',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o caliente
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Has elegido buscar una solución de NDT (No destructive Testing) para analizar defectos en producción en forma de hilo. Dinos por favor si es laminado en caliente o en frío?',
            [DialogLabels.ferrom_caliente, DialogLabels.ferrom_hilofrio],
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
            case DialogLabels.ferrom_caliente:
                return session.beginDialog('fcaliente');
            case DialogLabels.ferrom_hilofrio:
                return session.beginDialog('fhilofrio');
        }
       
    }
    
];

