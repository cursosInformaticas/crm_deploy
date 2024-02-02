const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// middle para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {
// add new client via POST
    router.post('/clientes', auth, clientesController.nuevoCliente);
// get all clients via GET
    router.get('/clientes', auth, clientesController.mostrarClientes);
// get one client via GET
    router.get('/clientes/:idCliente', auth, clientesController.mostrarCliente);
// update client via PUT
    router.put('/clientes/:idCliente', auth, clientesController.actualizarCliente);
// delete client via DELETE
    router.delete('/clientes/:idCliente', auth, clientesController.eliminarCliente);
    
//add new product via POST
    router.post('/productos', auth,
    productosController.subirArchivo,
    productosController.nuevoProducto);

    //get all products via GET
    router.get('/productos', auth, productosController.mostrarProductos);

    //get one product via GET
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    //update product via PUT
    router.put('/productos/:idProducto', auth,
    productosController.subirArchivo,
    productosController.actualizarProducto);

    //delete product via DELETE
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto);

    //search product via GET
    router.post('/productos/busqueda/:query', auth, productosController.buscarProducto);

    //add new order via POST
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido);

    //get all orders via GET
    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    //get one order via GET
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    // update order via PUT
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    //delete order via DELETE
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido);

    //crear cuenta via POST
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuario);

    //iniciar sesion via POST
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}