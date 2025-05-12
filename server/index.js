const port = 8000;

const cors = require("cors");
const express = require("express");
const db = require("./db");
const booksRouter = require("./routes/books.routes");
const membersRouter = require("./routes/members.routes");
const loansRouter = require("./routes/loans.routes");
const userRouter = require("./routes/users.routes");
const {authMiddleware} = require("./middlewares/auth");

const main = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  db.sequelize.sync({alter: true}).then(() => {
    console.log("Re-sync db.");
  });

  app.use("/books", booksRouter);
  app.use("/members", membersRouter);
  app.use("/loans", authMiddleware, loansRouter);
  app.use("/", userRouter);

  app.listen(port, () => {
    console.log(`App listening on ${port}`);
  });
};

main();
