import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
} from "../controllers/usuarioController.js";

import checkAuth from '../middleware/checkAuth.js';

//Autenticación, registro y confirmación de usuarios

//crear un nuevo usuario
router.post("/", registrar);
//autenticar
router.post("/login", autenticar);
//confirmar
router.get("/confirmar/:token", confirmar);

//recuperar password
router.post("/olvide-password", olvidePassword);

//usar route para compactar el código cuando dos rutas son iguales y solo cambia el método y la función
// router.get("/olvide-password/:token", comprobarToken);
// router.post("/olvide-password/:token", nuevoPassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//middleware de autenticación
router.get('/perfil', checkAuth, perfil);



export default router;
