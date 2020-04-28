
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/produto-repository');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');


exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        })
    }
   
}

exports.ByCategoria = async(req, res, next) => {
    try {
        var data = await repository.ByCategoria(req.params.categoria);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        })
    }
    

}

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 3, 'o nome deve conter no minimo 3 caracteres.');
    contract.hasMaxLen(req.body.nome, 140, 'o nome deve conter no máximo 140 caracteres.');
    contract.hasMinLen(req.body.categoria, 3, 'a categoria deve conter no minimo 3 caracteres.');
    contract.hasMaxLen(req.body.categoria, 140, 'a categoria deve conter no máximo 140 caracteres.');
   
    if(!contract.isValid){
        res.status(400).send(contract.errors()).end();
    }


    try {
        //cria o Blob services
        const blobSvc = azure.createBlobService(config.containerConnectionString);

        let filename = guid.raw().toString() + '.jpg';
        let rawdata = req.body.image;
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        //salva imagem
        await blobSvc.createBlockBlobFromText('produto-images', filename, buffer, {
            contentType: type
        }, function (error, result, response) {
            if(error){
                filename = 'default-produto.png'
            }
        }
        )




        await repository.Create({
            nome: req.body.nome,
            valor: req.body.valor,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria,
            image: 'https://najastore.blob.core.windows.net/produto-images/' + filename
        })
        res.status(201).send({
                message: 'Produto cadastrado com sucesso!'
            });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição."
    })
    }
}


exports.put = async(req, res, next) => {

try {
    await repository.update(req.params.id, req.body)
    res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        });
} catch (error) {
    res.status(500).send({
        message: "Falha ao processar requisição."
    })
}
    
    
}


exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id)
        res.status(201).send({
            message: 'Produto removido com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar requisição."
        })
    }
    
}

