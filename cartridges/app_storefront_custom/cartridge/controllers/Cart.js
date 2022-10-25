'use strict'
const server = require('server');

const Mail = require('dw/net/Mail');
const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const BasketMgr = require('dw/order/BasketMgr');
const ProductMgr = require('dw/catalog/ProductMgr');
const Resource = require('dw/web/Resource');
const URLUtils = require('dw/web/URLUtils');

server.extend(module.superModule);

server.append('AddProduct', function(req,res,next){
 
    let viewData = res.getViewData();
    let productId = req.form.pid;
    let product = ProductMgr.getProduct(productId);
    let currentBasket = BasketMgr.getCurrentBasket();
    let customerEmail = currentBasket.customer.profile.email;
    let template = new Template("mail/sendMail.isml");
    let params = new HashMap();
    let imageUrl = product.getImage("medium").absURL.toString();
    let productUrl = URLUtils.url('Product-Show', 'pid', productId).abs().toString();

    params.put("pid",productId); 
    params.put("productName",product.name); 
    params.put("description",product.shortDescription);
    params.put("price",product.priceModel.price.value);
    params.put("currency",product.priceModel.price.currencyCode);
    params.put("quantity", parseInt(req.form.quantity, 10).toFixed());
    params.put("imageUrl",imageUrl)
    params.put("productUrl",productUrl)

    let content= template.render(params);
    let mail = new Mail();
    let to = customerEmail;
    let from = dw.system.Site.getCurrent().getPreferences().custom.customerServiceEmail;
    let subject = Resource.msg('email.subject','email',null);
    
    mail.addTo(to);
    mail.setFrom(from);
    mail.setSubject(subject);
    mail.setContent(content);
  
    let status=mail.send();//returns either Status.ERROR or Status.OK, mail might not be sent yet, when this method returns
    
    res.setViewData(viewData);

    return next();

});

module.exports = server.exports();