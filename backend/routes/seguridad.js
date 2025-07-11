import express from "express"
const router = express.Router();
import jwt from "jsonwebtoken"
import auth from '../auth.js'

const users = [
  {
    usuario: "admin",
    clave: "123",
    rol: "administrador",
  },
  {
    usuario: "user",
    clave: "123",
    rol: "estudiante",
  },
];
let refreshTokens = [];

router.post("/login", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios: admin:123(rol jefe), juan:123(rol empleado)'

  const { usuario, clave } = req.body;

  // Filter user from the users array by usuario and clave
  const user = users.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    // Avanzado!
    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "Bienvenido " + user.usuario + " (rol: " + user.rol + ")",
    });
  } else {
    res.json({ message: "usuario or clave incorrecto" });
  }
});

router.post("/logout", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Logout: invalida el refresh token (no invalida el token actual!!!)'

  // recordar que el token sigue válido hasta que expire, aquí evitamos que pueda renovarse cuando expire!
  let message = null;
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader) {
     token = authHeader.split(" ")[1];
  }

  if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado correctamente!";
  }
  else {
    message = "Logout inválido!";
  }


  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});

router.post("/refreshtoken", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'refresh token'
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});


export default router
