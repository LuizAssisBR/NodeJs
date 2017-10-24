var mysql = require('mysql');

var connectionMYSQL = function(){
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    if(!process.env.NODE_ENV || process.env.NODE_ENV == 'dev'){
        return  mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'sj10#mysql',
            database:'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        return  mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'sj10#mysql',
            database:'casadocodigo_nodejs_test'
        });
    }

    if(process.env.NODE_ENV == 'production'){
        var url = process.env.CLEARDB_DATABASE_URL;
        //mysql://b4e26c84089f20:77818bcd@us-cdbr-iron-east-05.cleardb.net/heroku_49643a470afe669?reconnect=true
      // var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);

    //    return  mysql.createConnection({
    //         host:grupos[3],
    //         user:grupos[1],
    //         password:grupos[2],
    //         database:grupos[4]
    //     });

        return  mysql.createConnection({
            host:'us-cdbr-iron-east-05.cleardb.net',
            user:'b4e26c84089f20',
            password:'77818bcd',
            database:'heroku_49643a470afe669'
        });
    }
}


//wrapper
module.exports = function(){
    return connectionMYSQL;
}
