'use strict';

var server = require('server');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var ProductMgr = require('dw/catalog/ProductMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
   var viewData = res.getViewData();
   var productSearch = new ProductSearchModel();
   var pid = req.querystring.pid;
   var product = ProductMgr.getProduct(pid) ;
   var categoryID = product.primaryCategory.ID;
   var sortingRule = CatalogMgr.getSortingRule("price-low-to-high"); 
   productSearch.setSortingRule(sortingRule);
   productSearch.setCategoryID(categoryID);
   productSearch.search();
   viewData.productSearch = productSearch;

    res.setViewData(viewData);

    return next();

});


module.exports = server.exports();