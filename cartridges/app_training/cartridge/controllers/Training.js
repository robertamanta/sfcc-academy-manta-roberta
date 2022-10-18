'use strict'

const server = require('server');

server.get('HelloWorld', (req,res,next)=>{
    const myvariable = "Just a string";
    res.render("training/myfirsttemplate",{myvariable:myvariable});
    return next();
});



module.exports = server.exports();