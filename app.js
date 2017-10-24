//usando lib express - npm install express
// a biblioteca express possui recursos para facilitar o uso do servidor http. 

//instalações 
    //express  - é uma biblioteca para facilitar a manipulação do servidor http
    //ejs      - é uma view engine, assim como o razor do asp.net mvc, é renderizador de código html
    //nodemon  - é um utilitário que acompanha as anterações no fonte do projeto e reiniciará automaticamente
                 // o servidor a cada alteração - (espécie de deploy automático)
                 //npm install -g nodemon (onde g quer dizer global, ou seja para todos os projetos estará
                 //dispónivel o nodemon)  
   //commonjs  - é o padrão do nodejs usado para criação de modulos.  
   //mysql     - instalado o driver para conexão com banco de dados mysql - npm install mysql  --save
   //save      - o comando save server para registro no arquivo de configuração do projeto(pacjage.json)
                    //que teremos essa dependencia no projeto            
   //express-load - é uma biblioteca usado para carregar todas as rotas da aplicação em vez de chamar uma a uma (npm install express-load --save)
   //body-parser  - é uma biblioteca criada para realizar o parse do formulário html enviado do cliente para 
                    // para o servidor e converter o mesmo em um objeto json. npm install body-parser --save
  //Express-validator - é usado para validar os dados que chegam no servidor npm install express-validator --save  
  //mocha              - automação de testes npm install mocha --save-dev 
  //supertest          - é uma biblioteca de teste, serve para facilitar os testes. npm install supertest --save-dev 
                        //Supertest, que integra com o Mocha e ajuda a implementar o código do teste, deixando-o mais limpo mais claro.                
  //socket.io          - é uma lib para usar o protocolo WebSocket(html5) npm install socket.io --save
                        //ao usar socketio, ele vai decidir se o servidor esta habilitado para usar o protocolo socket ou pooling 

//criando banco de dados no heroku -prompt heroku addons:create cleardb:ignite

var app = require('./config/express')();//estou chamando meu módulo que retorna um objeto do express lib
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('io',io)

var port = process.env.PORT || 3000;
http.listen(port,function(){
    console.log('servidor esta rodando');
});
