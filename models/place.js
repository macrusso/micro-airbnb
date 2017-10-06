var mongoose = require('mongoose');


var placeSchema = new mongoose.Schema({
    name: String,
    photo: String,
    info: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Place', placeSchema);

// Place.create([
//     {
//         name: 'Hotel 1',
//         photo: 'https://officesnapshots.com/wp-content/uploads/2015/11/airbnb-london-office-design-9.jpg',
//         info: 'lorem ipsum'
//     },
//     {
//         name: 'Floating House',
//         photo: 'https://www.designboom.com/wp-content/uploads/2015/05/airbnb-floating-house-river-thames-london-designboom-05.jpg',
//         info: 'lorem ipsum'
//     },
//     {
//         name: 'Tower',
//         photo: 'https://www.destinationtips.com/wp-content/uploads/2015/05/water-tower-airbnb-London.jpg',
//         info: 'lorem ipsum'
//     }
//     ], function (err, places) {
//        if (err){
//            console.log('Something went wrong' + err);
//        } else {
//            console.log(places);
//        }
// });