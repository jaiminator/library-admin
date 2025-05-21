const port = 8000; //define el puerto donde el servido escucha las peticiones

//importamos CORS y Express
const cors = require("cors");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const db = require("./db");

//importamos las enrutaciones para manejar las distintas rutas
const booksRouter = require("./routes/books.routes");
const membersRouter = require("./routes/members.routes");
const loansRouter = require("./routes/loans.routes");
const userRouter = require("./routes/users.routes");

//importamos el modelo de autenticación para proteger las rutas de nuestra API
const {authMiddleware} = require("./middlewares/auth");

const main = () => {
  const app = express(); //crea una nueva instancia con Express
  app.use(cors()); //aplicamos CORS
  app.use(express.json()); //permite que la aplicación pueda procesar solicitudes con cuerpo (body) en formato JSON.

  //conexión y sincronización con la base de datos
  db.sequelize.sync({alter: false}).then(() => {
    console.log("Re-sync db.");
  });

  //utiliza las rutas de para los distintos controladores (con la protección de los préstamos mediante 'authmiddleware')
  app.use("/books", booksRouter);
  app.use("/members", membersRouter);
  app.use("/loans", authMiddleware, loansRouter);
  app.use("/users", userRouter);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  //inicia el servidor y lo escucha en el puerto definido
  app.listen(port, () => {
    console.log(`App listening on ${port}`);
  });
};

main();
