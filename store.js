var Promise = require('bluebird');

var ReviewsOptions = [
    '“La verdad es que los NDT en tiempo real nos ahorran millones”',
    '“Mapear la producción nos permite vender los productos de mayor calidad mucho más caros”',
    '“Need more attention to little things”',
    '“El ROTOdiscover es una pasada.”',
    '“Positive surprise”',
    '“No conocia estos metodos no destructivos en detalle”'];

module.exports = {
    searchHotels: function (material) {
        return new Promise(function (resolve) {

            // Filling the hotels results manually just for demo purposes
            var hotels = [];
            for (var i = 1; i <= 5; i++) {
                hotels.push({
                    name: material + ' ' + i,
                    location: ' ',
                    rating: Math.ceil(Math.random() * 5),
                    numberOfReviews: Math.floor(Math.random() * 5000) + 1,
                    priceStarting: 'Preguntanos',
                    image: 'http://www.isend.es/es/equipos/rotanalyzer+' + i + '&w=500&h=260'
                });
            }

           // hotels.sort(function (a, b) { return a.priceStarting - b.priceStarting; });

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(soluciones); }, 1000);
        });
    },

    searchHotelReviews: function (material) {
        return new Promise(function (resolve) {

            // Filling the review results manually just for demo purposes
            var reviews = [];
            for (var i = 0; i < 5; i++) {
                reviews.push({
                    title: ReviewsOptions[Math.floor(Math.random() * ReviewsOptions.length)],
                    text: 'Excelente guia',
                    image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif'
                });
            }

            // complete promise with a timer to simulate async response
            setTimeout(function () { resolve(reviews); }, 1000);
        });
    }
};