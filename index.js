import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

//configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //si esta en la white list puede consultar la API
      callback(null, true);
    } else {
      //No puede consultar la API
      callback(new Error("Error de CORS"));
    }
  }
};

app.use(cors(corsOptions));

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const port = process.env.PORT || 4000;
const servidor = app.listen(port, () => {
  console.log(`Servidor Funcionando en el puerto ${port}`);
});

//Socket.io
import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

io.on("connection", (socket) => {
  console.log("Conectado a socket.io");

  //Definir lo eventos de socket.io
  socket.on("abrir proyecto", (proyecto) => {
    socket.join(proyecto);
  });

  socket.on("nueva tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea agregada", tarea);
  });

  socket.on("eliminar tarea", (tarea) => {
    socket.to(tarea.proyecto).emit("tarea eliminada", tarea);
  });

  socket.on("actualizar tarea", (tarea) => {
    socket.to(tarea.proyecto._id).emit("tarea actualizada", tarea);
  });

  socket.on("cambiar estado", (tarea) => {
    socket.to(tarea.proyecto._id).emit("nuevo estado", tarea);
  });




});
