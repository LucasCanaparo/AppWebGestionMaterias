import express from 'express'
const router = express.Router();

import usuarios from '../models/usuarios.model.js'
import auth from'../auth.js'


// Obtener todas los usuarios, con seguridad JWT
router.get('/usuarios',
  auth.authenticateJWT,
  async function (req, res, next) {
    try {
        console.log('hola')
      // si llego hasta acá, es porque el token es válido y esta autenticado

      // ahora controlamos autorización, segun el rol
      const user = res.locals.user;
      console.log(user.rol, 'soy rol')
      if (user.rol !== "administrador") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }

      const items = await usuarios.findAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });


export default router

