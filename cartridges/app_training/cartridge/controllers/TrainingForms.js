"use strict";

var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

server.get("Show", consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(
    req,
    res,
    next
) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");

    var profileForm = server.forms.getForm("training");
    profileForm.clear();

    res.render("trainingform", {
        title: Resource.msg("training.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("TrainingForms-SubmitRegistration").toString()
    });

    next();
});

server.post(
    "SubmitRegistration",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next) {
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Transaction = require("dw/system/Transaction");
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");
        var UUIDUtils = require("dw/util/UUIDUtils");
        var profileForm = server.forms.getForm("training");
        var TrainingFormsModel = require('*/cartridge/models/trainingforms');
        var id = profileForm.customer.email.value;
        var newsletter = CustomObjectMgr.getCustomObject("NewsletterSubscription", id); 
       
     //daca nu exisa
   if(!newsletter){
         //il creez
         Transaction.wrap(function () {
            newsletter = CustomObjectMgr.createCustomObject("NewsletterSubscription",id); 
            newsletter.custom.lastName =profileForm.customer.lastname.value;;
            newsletter.custom.firstName =profileForm.customer.firstname.value;
         });
        }
    else
    {
      var error =   Resource.msg("training.form.error", "forms", null);
    }

       res.render("trainingform", {
            title: Resource.msg("training.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("TrainingForms-SubmitRegistration").toString(),
            error:error
        }
        );

        next();
    }
);

module.exports = server.exports();
