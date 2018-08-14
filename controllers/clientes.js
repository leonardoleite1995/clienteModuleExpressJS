module.exports = function(app){
    app.get('/clientes', function(req, res){  
      console.log('Recebida requisicao de teste na porta 3000.');
      let conexao = app.model.conexao();
      let clienteDAO = new app.model.clienteDAO(conexao);
      
      clienteDAO.lista(function(erro, resultado){
          if(erro){
            res.status(500).send(erro);
            return;
          }
          res.status(200).json(resultado);
      });      
    });

    app.post('/clientes/cliente', function(req, res){

        req.assert('cliente.nome', 'Campo Nome é obrigatorio').notEmpty();
        req.assert('cliente.cpf', 'Campo CPF é obrigatório').notEmpty();
        req.assert('cliente.sexo', 'Campo Sexo é obrigatório').notEmpty();
        req.assert('cliente.dataNascimento', 'Campo Data de nascimento deve conter uma data válida').notEmpty().toDate();
        req.assert('cliente.email', 'Campo Email deve conter um email válido').isEmail();
        req.assert('cliente.senha', 'Campo Senha é obrigatório').notEmpty();
        let erros = req.validationErrors();

        if(erros){
            console.log('Erros de validação encontrados ' + req.body.cliente);
            res.status(400).send(erros);
            return;
        }

        let cliente = req.body.cliente;
        let conexao = app.model.conexao();
        let clienteDAO = new app.model.clienteDAO(conexao);

        clienteDAO.salva(cliente, function(error, result){
            if(error){
                console.log('Erro ao salvar dados no banco');
                res.status(500).send(error);
            }else{
                cliente.codCliente = result.insertId;
                console.log('Cliente cadastrado com sucesso');
                res.status(201).json(cliente);
            }
        });
    });

    app.put('/clientes/atualiza/:codCliente', function(req, res){

        req.assert('cliente.nome', 'Campo Nome é obrigatorio').notEmpty();
        req.assert('cliente.cpf', 'Campo CPF é obrigatório').notEmpty();
        req.assert('cliente.sexo', 'Campo Sexo é obrigatório').notEmpty();
        req.assert('cliente.dataNascimento', 'Campo Data de nascimento deve conter uma data válida').notEmpty().toDate();
        req.assert('cliente.email', 'Campo Email deve conter um email válido').isEmail();
        req.assert('cliente.senha', 'Campo Senha é obrigatório').notEmpty();
        let erros = req.validationErrors();

        if(erros){
            console.log('Erros de validação encontrados ' + req.body.cliente);
            res.status(400).send(erros);
            return;
        }

        let cliente = req.body.cliente;
        let conexao = app.model.conexao();
        let clienteDAO = new app.model.clienteDAO(conexao);

        cliente.codCliente = req.params.codCliente;

        clienteDAO.atualiza(cliente, function(error, result){
            if(error){
                console.log('Erro ao salvar dados no banco');
                res.status(500).send(error);
            }else{
                console.log('Dados do cliente atualizados com sucesso');
                res.status(200).json(cliente);
            }
        });
    });

    app.delete('/clientes/remove/:codCliente', function(req, res){

        let codCliente = req.params.codCliente;
        let conexao = app.model.conexao();
        let clienteDAO = new app.model.clienteDAO(conexao);

        clienteDAO.remove(codCliente, function(error, result){
            if(error){
                console.log('Erro ao deletar dados no banco');
                res.status(500).send(error);
            }else{
                console.log('Dados do cliente removidos com sucesso');
                res.status(200).send('Dados do cliente removidos com sucesso');
            }
        });
    });
}