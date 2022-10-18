
      'use strict';
      
      var server = require('server');
      //Creating a Basket JavaScript Controller and Using a Loop in ISML
      server.get('Basket', function (req, res, next) {
          var BasketMgr = require("dw/order/BasketMgr");
       
          var currentBasket = BasketMgr.getCurrentBasket();
          res.render("trainingbasket/showBasket",{Basket:currentBasket});
          return next();
          // Use ISML to display Basket object
          // The rendered ISML should be showBasket.isml (Use the quickcard section "Giving control to ISML" for help)
      });
       
      module.exports = server.exports();
      
            