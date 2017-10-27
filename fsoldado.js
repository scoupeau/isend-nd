var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    defpunto:'Defecto puntual en cordones de soldadura',
    deftransversal:'Defecto transversal en soldadura',
    deflong:'Defecto longitudinal en soldadura',
    defperiodico:'Defecto periodico en soldadura',
    Support: 'Support'
};

module.exports = [
    // material ferromagnetico en hilo frio o caliente
    function (session) {
        //fcaliente es ferromagneticoencaliente fhilofrio es ferromag. geom hilo o barra en frio
        builder.Prompts.choice(
            session,
            'Has elegido buscar una solucion de NDT para analizar defectos en el cordón de soldadura. ¿Qué defecto quieres detectar y mapear?',
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
                return session.beginDialog('ffriopuntosold'); //weldiscover
            case DialogLabels.deftransversal:
                return session.beginDialog('ffriotransversalsold'); //DEFdiscover
            case DialogLabels.deflong:
                return session.beginDialog('ffriolongsold'); //igual que ffriopuntosold pero cambia titulo. ¿admite un dialog un param?
            case DialogLabels.defperiodico:
                return session.beginDialog('ffrioperiodicosold'); //endiscover

        }
       
    }
    
];

