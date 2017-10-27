var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    defpunto:'Defecto puntual en caliente',
    deftransversal:'Defecto transversal en caliente',
    deflong:'Defecto longitudinal en caliente',
    defperiodico:'Defecto periodico en caliente',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o caliente
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Has elegido buscar una solucion de NDT para analizar defectos en producción de un material en caliente. ¿Qué defecto quieres detectar y mapear?',
            [DialogLabels.defpunto, DialogLabels.deftransversal,DialogLabels.deflong,DialogLabels.defperiodico],
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
            case DialogLabels.defpunto:
                return session.beginDialog('fcalpunto');
            case DialogLabels.deftransversal:
                return session.beginDialog('fcaltransversal');
            case DialogLabels.deflong:
                return session.beginDialog('fcallong');
            case DialogLabels.defperiodico:
                return session.beginDialog('fcalperiodico');

        }
       
    }
    
];

