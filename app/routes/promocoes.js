module.exports = function(app){
    app.get('/promocoes/form',function(request,response){
        var conn = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(conn);
        produtosDAO.lista(function(error,results){
            response.render('promocoes/form', {lista:results});
        });
        conn.end();
    });

    app.post('/promocoes',function(request,response){

            var promocao =  request.body;
            console.log(promocao);
            var io = app.get('io');
            console.log(io);
            io.emit('novaPromocao',promocao);
            response.redirect('/promocoes/form');
    });
}