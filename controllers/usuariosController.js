
const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res, next) => {
    //leer los datos del usuario y colocarlos en Usuario
    const usuario = new Usuario(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);
    try {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});
    }
}
//autenticar usuario
exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        //si el usuario no existe
        await res.status(401).json({mensaje: 'Ese usuario no existe'});
        next();
    }else{
        //el usuario existe, verificar si el password es correcto o incorrecto
        if(!bcrypt.compareSync(password, usuario.password)){
            //si el password es incorrecto
            await res.status(401).json({mensaje: 'Password incorrecto'});
            next();
        }else{
            //password correcto, firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA', {
                expiresIn: '1h'
            });
            //retornar el token
            res.json({token});  
        }
    }
}