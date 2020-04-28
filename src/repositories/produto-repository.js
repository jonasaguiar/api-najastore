const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

exports.get = async() => {
    const res = await Produto.find({}, 'nome valor quantidade categoria');
    return res;

}

exports.getByCategoria = async(categoria) => {
    const res = Produto.find({
        categoria: categoria
    }, 'nome valor quantidade categoria');
    return res;
}

exports.create = async(data) => {
    var produto = new Produto(data);
    await produto.save();
}

exports.update = async(id, data) => {
    await Produto.findByIdAndUpdate(id,{
        $set: {
            nome: data.nome,
            valor: data.valor,
            quantidade: data.quantidade,
            categoria: data.categoria,
            imagem: data.imagem
        }
})}

exports.delete = async(id) => {
   await Produto.findOneAndRemoveByIdAndRemove(id)
}
