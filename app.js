/*var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/
/////////////////////////////////////////
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "e8917786-7932-4dae-b578-53f5cb495a76",
    appPassword: "xRxTcKE27wwpkDYRBLjPOnz"
    // appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());



var DialogLabels = {
    FerroMag: 'Metal Ferromagnético, acero fundición, hierro fundido, niquel, cobalto o similares',
    NoFerroMag: 'No Ferromagnético, grafito, plomo,titanio,circonio,uranio o similares',
    hilo:'hilo',
	barra:'barra',
	tubosoldado:'tubosoldado',
	tubosinsoldadura:'tubosinsoldadura',
	pieza:'pieza',
	Support: 'Support',
    grafito:'Grafito',
    titanio:'Titanio',
    aceroinox:'Acero Inox',
    zirconio: 'Zirconio',
    uranio:'Uranio',
    plomo:'Plomo',
    aleacion:'Aleación Aluminio',
    tungsteno:'tungsteno',
    magnesio:'Magnesio',
    oro:'Oro',
    aluminio:'Aluminio',
    cobre:'Cobre',
    acero:'Acero fundido',
    aceroaleacion:'Acero Aleacion',
    hierrofundido:'hierro fundido'
};



// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {

    //digo algo
    session.send('Hola!. Soy el asistente de ISEND NDT (No Destructive Tests). ¿Qué tal?');


        // prompt for search option
        builder.Prompts.choice(
            session,
            '¿Trabaja su empresa con alguno de estos materiales? (Pulse 1 ó 2)',
            [DialogLabels.FerroMag, DialogLabels.NoFerroMag],
            //, DialogLabels.grafito, DialogLabels.titanio,
             //DialogLabels.aceroinox, DialogLabels.circonio, DialogLabels.uranio, DialogLabels.plomo],
            // DialogLabels.aleacion, DialogLabels.tungsteno, DialogLabels.magnesio, DialogLabels.oro,
            // DialogLabels.aluminio, DialogLabels.cobre, DialogLabels.acero, DialogLabels.aceroaleacion,DialogLabels.hierrofundido],
            {
                maxRetries: 3,
                retryPrompt: 'Opción no válida'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Demasiados intentos fallidos :( Pero no te preocupes, vamos a empezar de nuevo');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Error: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog
        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.FerroMag:
                return session.beginDialog('FerroMag');
          /*  case DialogLabels.aceroinox:
                return session.beginDialog('FerroMag');
            case DialogLabels.circonio:
                return session.beginDialog('NoFerroMag');
            case DialogLabels.uranio:
                return session.beginDialog('NoFerroMag');
            case DialogLabels.plomo:
                return session.beginDialog('NoFerroMag');
            case DialogLabels.aluminio:
                return session.beginDialog('NoFerroMag');*/
            case DialogLabels.NoFerroMag:
                return session.beginDialog('NoFerroMag');  //'NoFerroMag'
            default:
                return session.beginDialog('NoFerroMag');
        }
    }
]);

bot.dialog('FerroMag', require('./FerroMags'));
bot.dialog('NoFerroMag', require('./noferromags'));
bot.dialog('hilo', require('./hilo'));
bot.dialog('barra', require('./barra'));
bot.dialog('tubosoldado', require('./tubosoldado'));
bot.dialog('tubosinsoldadura', require('./tubosinsoldadura'));
bot.dialog('pieza', require('./pieza'));
bot.dialog('fcaliente', require('./fcaliente'));
bot.dialog('fhilofrio', require('./fhilofrio'));
bot.dialog('fcalpunto', require('./fcalpunto'));
bot.dialog('fcaltransversal', require('./fcaltransversal'));
bot.dialog('fcallong', require('./fcallong'));
bot.dialog('fcalperiodico', require('./fcalperiodico'));
bot.dialog('ffriopunto', require('./ffriopunto'));
bot.dialog('ffriotransversal', require('./ffriotransversal'));
bot.dialog('ffriolong', require('./ffriolong'));
bot.dialog('ffrioperiodico', require('./ffrioperiodico'));
bot.dialog('fsoldado', require('./fsoldado'));
bot.dialog('fsinsold', require('./fsinsold'));
bot.dialog('ffriopuntosold', require('./ffriopuntosold'));
bot.dialog('ffriotransversalsold', require('./ffriotransversalsold'));
bot.dialog('ffriolongsold', require('./ffriolongsold'));
bot.dialog('ffrioperiodicosold', require('./ffrioperiodicosold'));
bot.dialog('ffriopuntopieza', require('./ffriopuntopieza'));
bot.dialog('ffriotransversalpieza', require('./ffriotransversalpieza'));
bot.dialog('ffriolongpieza', require('./ffriolongpieza'));
bot.dialog('ffrioperiodicopieza', require('./ffrioperiodicopieza'));
bot.dialog('titanio',require('./noferromags'));
bot.dialog('aceroinox', require('./noferromags'));
bot.dialog('circonio',require('./noferromags'));
bot.dialog('uranio', require('./noferromags'));
bot.dialog('plomo', require('./noferromags'));
bot.dialog('aleacion', require('./noferromags'));
bot.dialog('tungsteno',require('./noferromags'));
bot.dialog('magnesio', require('./noferromags'));
bot.dialog('oro',require('./noferromags'));
bot.dialog('aluminio', require('./noferromags'));
bot.dialog('cobre',require('./noferromags'));
bot.dialog('acero', require('./noferromags'));
bot.dialog('aceroaleacion',require('./noferromags'));
bot.dialog('hierrofundido',require('./ferromags'));
bot.dialog('support', require('./support'))
    .triggerAction({
        matches: [/help/i, /soporte/i, /problema/i]
    });

//Event handler
bot.on('conversationUpdate', function (message) {
    console.log('conversationUpdate');
    console.dir(message);
    bot.send(new builder.Message()
        .address(message.address)
        .text('¡Hola!', message.address.user.name));
       // .text('Hola %s!', message.address.user.name));
});

bot.on('contactRelationUpdate', function (message) {
    console.log('contactRelationUpdate');
    console.dir(message);
    if (message.action == 'add') {
        bot.send(new builder.Message()
            .address(message.address)
            .text('El asistente ha sido añadido a la lista de contactos. Gracias'));
 
        bot.send(new builder.Message()
            .address(message.address)
            .text('Hola %s! Action %s', message.address.user.name, message.action));
    }
    else{
        //The user stops to use your bot snif
    }
});
 

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('Se ha producido un error', e);
});