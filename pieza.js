var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    defpunto:'Defecto puntual en Piezas que rotan',
    deftransversal:'Defecto transversal en piezas',
    deflong:'Defecto longitudinal en piezas',
    defperiodico:'Defecto periodico en piezas',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o caliente
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Has elegido buscar una solucion de NDT para analizar defectos en producción de piezas que puedan rotar. ¿Qué defecto quieres detectar y mapear?',
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
                return session.beginDialog('ffriopuntopieza');
            case DialogLabels.deftransversal:
                return session.beginDialog('ffriotransversalpieza');
            case DialogLabels.deflong:
                return session.beginDialog('ffriolongpieza');
            case DialogLabels.defperiodico:
                return session.beginDialog('ffrioperiodicopieza');

        }
       
    }
    
];

