function ClienteDAO(connection) {
    this._connection = connection;
}

ClienteDAO.prototype.salva = function(cliente,callback) {
    this._connection.query('INSERT INTO clientes SET ?', cliente, callback);
}

ClienteDAO.prototype.lista = function(callback) {
    this._connection.query('select * from clientes',callback);
}

ClienteDAO.prototype.buscaPorId = function (codCliente,callback) {
    this._connection.query("select * from clientes where codCliente = ?",[codCliente],callback);
}

ClienteDAO.prototype.atualiza = function (cliente,callback) {
    this._connection.query("update clientes set ? where codCliente = ?",[cliente, cliente.codCliente],callback);
}

ClienteDAO.prototype.remove = function (codCliente,callback) {
    this._connection.query("delete from clientes where codCliente = ?", codCliente,callback);
}

  module.exports = function(){
    return ClienteDAO;
  };