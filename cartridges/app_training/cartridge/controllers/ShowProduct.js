'use strict'
const productMgr = require('dw/catalog/ProductMgr');

const server = require('server');
//denumim  controllerul ca si template-ul

//Use Remote Includes #1
server.get('ShowProd', function(req,res,next){
    //const myvariable = "Just a string";
    const id= req.querystring.pid;
    const myProduct = productMgr.getProduct(id); 
    res.render("product/productfound",{myProduct:myProduct,id:id});
    return next();
});

module.exports = server.exports();