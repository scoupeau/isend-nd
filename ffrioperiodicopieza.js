var builder = require('botbuilder');
//var Store = require('./store');

// aqui defectos puntuales  mostrar hotdiscover y eddyeyes como tarjetas para ferromagneticos en caliente
module.exports = [
    

    function (session) {
      
     var msg = new builder.Message(session)
    .addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.0",
            speak: "<s>La solución que buscas para analizar en tiempo real tu producción\"<break strength='weak'/> </s>",
               body: [
                    {
                        "type": "TextBlock",
                        "text": "Solución MATdiscover para Defectos Puntuales en frío",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "MATdiscover es nuestra solución para piezas. Ideal para brazos robotizados"
                    },
                    {
                        "type": "Image",
                        "text": "MATdiscover",
                        "url":  "http://www.isend.es/images/piezas_320/pieza1_320.png"
                    },
                    // {
                    //     "type": "TextBlock",
                    //     "text": "Lo puedes combinar con EDDYeyes (visión artificial)"
                    // },
                    
                    
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://www.isend.es/es/soluciones/matdiscover",
                        "body": "MATdiscover corrientes de inducción ",
                        "title": "Pulsa aqui para saber más de MATdiscover"
                    },
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://www.isend.es/images/catalogos/CC_ISEND-ES.pdf",
                        "body": "catálogo completo",
                        "title": "Ver todo el catálogo"
                    }
                ]
        }
    });

            session.send(msg);

                // End
                session.endDialog();
    
    }
 
];

function hotelAsAttachment(soluciones) {
    return new builder.HeroCard()
        .title('HOTdiscover')
        .subtitle('Sistema NDT para detectar y mapear defectos puntuales en tiempo real')
        .images([new builder.CardImage().url('http://www.isend.es/images/hotdiscover/hotanalyzer.png')])
        .buttons([
            new builder.CardAction()
                .title('Pulsa aqui para ver más detalles')
                .type('openUrl')
                .value('http://www.isend.es/es/equipos/hotanalyzer')
        ]);
}