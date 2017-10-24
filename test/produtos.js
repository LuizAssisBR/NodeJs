// var http = require('http');
// var assert = require('assert');

// describe('#ProdutosController',function(){
//     it('#passo 1 : listagem produtos em formato json',function(done){
//         var config = {
//             hostname:'localhost',
//             port:3000,
//             path:'/produtos',
//             headers:{
//                 'Accept':'application/json'
//             }
//         };
//           http.get(config,function(response){
//               assert.equal(response.statusCode,200);
//               assert.equal(response.headers['content-type'],'application/json; charset=utf-8')  
//                 done();//função de finalização
//           });  
//     });
// });

//PARA TESTAR - NODEJS = node  node_modules/mocha/bin/mocha

var express = require('../config/express')();
var request = require('supertest')(express);

//describe e it são métodos da lib do mocha, enquanto o request faz parte da lib do supertest
describe('#ProdutosController',function(){

    //função disponivel no mocha lib para ser executado antes de cada caso de teste.
    beforeEach(function(done){
        var conn = express.infra.ConnectionFactory();
        conn.query('delete from produtos;',function(ex,result){
            if(!ex)
                done();
        });
    });

    it('#passo 1 : listagem produtos em formato json',function(done){
          request.get('/produtos')
          .set('Accept','application/json')
          .expect('Content-Type',/json/)
          .expect(200,done);      
    });

    it('#passo 2 : inserindo um novo produto inválido',function(done){
        request.post('/produtos')
        .send({titulo:'', descricao:'novo livro', preco:25.55})
        .expect(400,done);
    });

    it('#passo 3 : inserindo um novo produto válido',function(done){
        request.post('/produtos')
        .send({titulo:'programando com nodejs (iniciante)',
                descricao:'livro voltado para iniciantes de programação',
                preco:55.56})
        .expect(302,done);        
    });
});