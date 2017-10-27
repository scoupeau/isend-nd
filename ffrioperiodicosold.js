var builder = require('botbuilder');
var Store = require('./store');

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
                        "text": "Solución ENdiscover para Defectos Periodicos en frío",
                        "size": "large",
                        "weight": "bolder"
                    },
                    {
                        "type": "TextBlock",
                        "text": "ENdiscover es nuestra solución NDT para tu producto"
                    },
                    {
                        "type": "TextBlock",
                        "text": "Lo puedes combinar con ROTOdiscover en algunos casos"
                    },
                    {
                        "type": "Image",
                        "text": "ENdiscover",
                        "url":  "http://www.isend.es/images/infografias_cuadradas/infog_endiscover.png"
                    },
                    
                    
                ],
                "actions": [
                    {
                        "type": "Action.OpenUrl",
                        "method": "POST",
                        "url": "http://www.isend.es/es/soluciones/endiscover",
                        "body": "ENdiscover corrientes de inducción ",
                        "title": "Pulsa aqui para saber más de ENdiscover"
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

            



    // create the card based on selection
    //var selectedCardName = session.response.entity;
    var card = createCard('CardImage', session);
    var imagen = card.url('http://www.isend.es/images/infografias_cuadradas/infog_endiscover.png');
            session.send(imagen);


    // attach the card to the reply message
    var mensaje = new builder.Message(session).addAttachment(card);
    session.send(mensaje);


                // End
                session.endDialog();
    /* var message = builder.HeroCard()
        .title('HOTdiscover')
        .subtitle('Sistema NDT para detectar y mapear defectos puntuales en tiempo real')
        .images([new builder.CardImage().url('http://www.isend.es/images/hotdiscover/hotanalyzer.png')])
        .buttons([
            new builder.CardAction()
                .title('Pulsa aqui para ver más detalles')
                .type('openUrl')
                .value('http://www.isend.es/es/equipos/hotanalyzer')
        ]);
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                   // .attachments(soluciones.map(hotelAsAttachment));

                session.send(message);

                // End
                session.endDialog();*/
    }
 
];

function hotelAsAttachment(soluciones) {
    return new builder.HeroCard()
        .title('HOTdiscover')
        .subtitle('Sistema NDT para detectar y mapear defectos puntuales en tiempo real')
        .images([new builder.CardImage().url('http://www.isend.es/images/infografias_cuadradas/infog_endiscover.png')])
        .buttons([
            new builder.CardAction()
                .title('Pulsa aqui para ver más detalles')
                .type('openUrl')
                .value('http://www.isend.es/es/equipos/hotanalyzer')
        ]);
}