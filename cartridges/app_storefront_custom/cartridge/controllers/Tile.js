'use strict';

var discount = require('*/cartridge/scripts/helpers/discount');

var server = require('server');
 
server.extend(module.superModule);
 
server.append('Show', function (req, res, next) {
 
    var viewData = res.getViewData();
    var product = viewData.product; 
    if (product.price.list){
        var bestDeal = discount.getBestDeal(product);
        viewData.bestDeal =bestDeal.toFixed();
    }
    res.setViewData(viewData);
 
    return next();
   
});
 
 
module.exports = server.exports();