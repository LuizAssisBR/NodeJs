var express          = require('express');
var load             = require('express-load');
var bodyParser       = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    var app = express();
    app.set('view engine','ejs');
    app.set('views','./app/views');
    
    //configurações iniciais no objeto request do ExpressJS
    //configurar o request antes de carregar as rotas
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());//faz o parse de um objeto json vindo via post 
    app.use(expressValidator());
    app.use(express.static('./app/public'));

    
  
    
    load("routes",{cwd:'app'})
        .then("infra")
        .into(app);
    
    //Utilizando Middlewares 
    app.use(function(request,response,next){
        response.status(404).render('erros/404');
    });
     app.use(function(error,request,response,next){
        if(process.env.NODE_ENV != 'production'){
            response.status(500).render('erros/500');
        }
        next();
    });

    return app;
}