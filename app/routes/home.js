
module.exports = function(app){

    app.get('/',function(request,response,next){


        var conn = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(conn);
        produtosDAO.lista(function(error,results){
            if(error)
                return next(error);
             console.log(results);   
            response.render('../public/index', {livros:results});
        });
        conn.end();

    });

}