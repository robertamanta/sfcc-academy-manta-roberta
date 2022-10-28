'use strict';
var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var Resource = require("dw/web/Resource");
var formErrors = require('*/cartridge/scripts/formErrors');
var Transaction = require('dw/system/Transaction');
var emailHelper = require('*/cartridge/scripts/emailHelper')
var Cupon = require('dw/campaign/Coupon');
var CouponMgr = require('dw/campaign/CouponMgr');
var HashMap = require('dw/util/HashMap');
var Template = require('dw/util/Template');

server.get('Show', server.middleware.https, function (req, res, next) {
    var newsletterForm = server.forms.getForm('newsletter'); 
    newsletterForm.clear();
    res.render('newsletter/newsletter', {
    newsletterForm: newsletterForm
   });
 next();
});

server.post('Save', server.middleware.https,
  function(req, res, next) {
  var newsletterForm = server.forms.getForm('newsletter');
  var error;
  var id = newsletterForm.email.value;
  var newsletter = CustomObjectMgr.getCustomObject("NewsletterSubscription", id); 
  //if the user already subscribed - error message
  if (newsletter)
  {
    
       error = Resource.msg("error.message.alreadyexists.newsletter", "forms", null);
    
  }

  var result = {
    email:newsletterForm.email,
    firstName:newsletterForm.firstname,
    lastName:newsletterForm.lastname
  }
  
  if (newsletterForm.valid){
      res.setViewData(result);

  this.on('route:BeforeComplete', function (req, res) { 
     
        var formInfo = res.getViewData();
        var coupon = CouponMgr.getCoupon("20newsletter");
        var couponCode;
      
          if(!newsletter){
            //create a NewsletterSubscription
            Transaction.wrap(function () {
               newsletter = CustomObjectMgr.createCustomObject("NewsletterSubscription",id); 
               newsletter.custom.lastName =formInfo.lastName.value;
               newsletter.custom.firstName =formInfo.firstName.value;
            
               //Generate coupon
               couponCode=coupon.getNextCouponCode();
            });

            if(newsletter){  
              var context=new HashMap();
              var name = formInfo.firstName.value+" "+formInfo.lastName.value
              context.put("name",name);
              
              var emailObj={
                to:formInfo.email.value,
                subject:Resource.msg("email.subject", "newsletter", null),
                from:dw.system.Site.getCurrent().getPreferences().custom.customerServiceEmail
              }
              //send mail  
              emailHelper.send(emailObj, "newsletter/newsletterEmail.isml", context)

              //if cuponCode was generated send mail with the code else send noCuponLeftEmail
              if(couponCode)
                {
                  context.put("couponCode",couponCode);
                  emailHelper.send(emailObj, "newsletter/couponEmail.isml", context)
                } 
                else
                {
                  emailHelper.send(emailObj, "newsletter/noCouponLeftEmail.isml", context);
                }
            }
           }
  });
  }

  var message;
//if error return error message else return success message
  if (error)
  {
    message = error;
  }
  else
  {
    message = Resource.msg("newsletter.msg.thanks", "newsletter", null);
  }
 res.render('newsletter/newsletterSubscribed',{message:message});
   return next();
});
module.exports = server.exports();