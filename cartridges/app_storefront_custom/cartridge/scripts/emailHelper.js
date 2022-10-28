'use strict'

function send(emailObj,templateName,context){
    const Mail = require('dw/net/Mail');
    const Template = require('dw/util/Template');
    let template =new Template(templateName);
    let content= template.render(context);
    let mail = new Mail();
    let to = emailObj.to;
    let from = emailObj.from;
    let subject = emailObj.subject;

    mail.addTo(to);
    mail.setFrom(from);
    mail.setSubject(subject);
    mail.setContent(content);

    mail.send();
}

module.exports = {
    send: send

};