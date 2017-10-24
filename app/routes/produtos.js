
//criando um modulo
module.exports = function(app){
    //criando uma rota
    app.get('/produtos',function(request,response,next){
        var connection = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(error,results){
            //response.send(results);// send para respostas json direto no navegador
            if(error)
                return next(error);

            response.format({
                html:function(){
                    response.render('produtos/lista',{lista:results});
                },
                json:function(){
                    response.json(results);
                }
            });
            
        });
        connection.end();
    });

    app.get('/produtos/form',function(request,response){
        response.render('produtos/form',
        {
         erros:{},
         produto:{}
        });
    });

    app.post('/produtos',function(request,response){
        var produto = request.body;//BODY PODE VIR TANTO DO FORMULÁRIO HTML OU VIA AJAX FORMATO JSON
       
        request.assert('titulo','Titulo é obrigatório.').notEmpty();
        request.assert('preco','Formato inválido.').isFloat();
        var erros = request.validationErrors();
        
        if(erros){
           response.format({
               html:function(){
                    response.status(400).render('produtos/form',{erros:erros,produto:produto});
               },
               json:function(){
                   response.status(400).json(erros);
               }
           });   
           return;  
        }
        var connection = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salvar(produto,function(error,resultados){
            response.format({
                html:function(){
                         response.redirect('/produtos');
                },
                json:function(){
                    response.json(produto);
                }
            });
        });
    });
}