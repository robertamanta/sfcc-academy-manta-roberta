'use strict'
const server = require('server');
//Use Remote Includes #2 modul 7
server.get('RenderTemplate', function(req,res,next){

    res.render("testremodeinclude/test");
    return next();
});

server.get('TestRemoteInclude', function(req,res,next){

    res.render("testremodeinclude/test2");
    return next();
});

//Use a Decorator modul 7
server.get('TestDecorator', function(req,res,next){

    res.render("testremodeinclude/testdecorator");
    return next();
});

module.exports = server.exports();