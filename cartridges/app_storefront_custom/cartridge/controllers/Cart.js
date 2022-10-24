'use strict';


var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
var TotalsModel = require('*/cartridge/models/totals');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {

    var viewData = res.getViewData();
    var currentBasket = BasketMgr.getCurrentBasket();
    
    var thresholdValue = dw.system.Site.getCurrent().getPreferences().custom.thresholdValue;
    var total = currentBasket.merchandizeTotalPrice.value;  
    viewData.thresholdValue = thresholdValue;
    viewData.total = total;
    res.setViewData(viewData);
    return next();

});

module.exports = server.exports();

