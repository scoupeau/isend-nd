var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    defpunto:'Defecto puntual en frio',
    deftransversal:'Defecto transversal en frio',
    deflong:'Defecto longitudinal en frio',
    defperiodico:'Defecto periodico en frio',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o frio
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Has elegido buscar una solucion de NDT para analizar defectos en producción de un material Ferromagnético en FRÍO. ¿Qué defecto quieres detectar y mapear?',
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
                return session.beginDialog('ffriopunto');
            case DialogLabels.deftransversal:
                return session.beginDialog('ffriotransversal');
            case DialogLabels.deflong:
                return session.beginDialog('ffriolong');
            case DialogLabels.defperiodico:
                return session.beginDialog('ffrioperiodico');

        }
       
    }
    
];

