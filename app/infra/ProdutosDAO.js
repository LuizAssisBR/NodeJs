function ProdutosDAO(connection){
    this._connection =connection;
}

ProdutosDAO.prototype.lista = function(callback){
     this._connection.query('select * from produtos;',callback);
}

ProdutosDAO.prototype.salvar = function(produto,callback){
    this._connection.query('insert into produtos set ?',produto,callback);
   // this._connection.query('insert into produtos (titulo,descricao,preco) values(?,?,?)',
   // [produto.titulo,produto.descricao,produto.preco],callback);
}


module.exports = function(){
    return ProdutosDAO;
}