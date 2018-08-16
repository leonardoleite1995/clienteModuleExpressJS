var mysql  = require('mysql');
var conexao;
  function createDBConnection(){
    if(conexao){ return conexao; }
    conexao = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'CLIENTES'
    });
    return conexao; 
  }

  module.exports = function() {
    return createDBConnection;
  }