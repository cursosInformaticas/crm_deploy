const Clientes = require('../models/Clientes');

//add new client
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);
    try {
        //store in DB
        await cliente.save();
        res.json({mensaje: 'Cliente agregado correctamente'});
    } catch (error) {
        //if there is an error, console.log it and next
        console.log(error);
        res.send(error);
        next();
    }
}
//get all clients
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}
//get one client
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
        res.json({mensaje: 'Ese cliente no existe'});
        next();
    }
    res.json(cliente);
}
//update client
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body, {
            new: true
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}
//delete client
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}