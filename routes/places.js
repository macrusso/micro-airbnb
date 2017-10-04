var express = require('express');
var router = express.Router();


var places = [
    {
        name: 'Hotel 1',
        photo: 'https://officesnapshots.com/wp-content/uploads/2015/11/airbnb-london-office-design-9.jpg',
        info: 'lorem ipsum'
    },
    {
        name: 'Floating House',
        photo: 'https://www.designboom.com/wp-content/uploads/2015/05/airbnb-floating-house-river-thames-london-designboom-05.jpg',
        info: 'lorem ipsum'
    },
    {
        name: 'Tower',
        photo: 'https://www.destinationtips.com/wp-content/uploads/2015/05/water-tower-airbnb-London.jpg',
        info: 'lorem ipsum'
    }
];


router.get('/', function(req, res) {
  res.render('./places/index', {places: places});
});


module.exports = router;
