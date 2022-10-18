'use strict'

const server = require('server');
//denumim  controllerul ca si tempate-ul
server.get('MyPage', function(req,res,next){
    const myvariable = "Just a string";
    res.render("vartest/mytemplate",{myvariable:myvariable});
    return next();
});



module.exports = server.exports();