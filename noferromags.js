var builder = require('botbuilder');
var Store = require('./store');

var DialogLabels = {
    hilo:'hilo',
	barra:'barra',
	tubosoldado:'tubosoldado',
	tubosinsoldadura:'tubosinsoldadura',
	pieza:'pieza',
	Support: 'Support'
};

module.exports = [
    // material
    function (session) {
        session.send('Isend puede analizar en tiempo real materiales ferromagnéticos y no ferromagnéticos metálicos');
       // builder.Prompts.text(session, 'Por favor escriba el material ferromagnético:');
   // },
   //{
        // session.dialogData.material = results.response;
        // session.send('Analizando tipo de NDT (Test No destructivo) para %s', results.response);
        // next();
  //  },

    // geometria
   // function (session) {
        //builder.Prompts.time(session, '');
         // prompt for search option
        builder.Prompts.choice(
            session,
            '¿Qué Geometría tiene el producto en su elaboración?',
            [DialogLabels.hilo, DialogLabels.barra,DialogLabels.tubosoldado,DialogLabels.tubosinsoldadura,DialogLabels.pieza],
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
            case DialogLabels.hilo:
                return session.beginDialog('hilo');
            case DialogLabels.barra:
                return session.beginDialog('barra');
              case DialogLabels.tubosoldado:
                return session.beginDialog('tubosoldado');
            case DialogLabels.tubosinsoldadura:
                return session.beginDialog('tubosinsoldadura');   
            case DialogLabels.pieza:
                return session.beginDialog('pieza');   
        }
    },

    
    
];


