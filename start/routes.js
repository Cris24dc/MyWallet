import bodyParser from "body-parser";
import registerUser from "../routes/registerUser.js";
import loginUser from "../routes/loginUser.js";
import user from "../routes/users.js";
import transaction from "../routes/transactions.js";
import saving from "../routes/saving.js";
import currency from "../routes/currency.js";
import update from "../routes/update.js";

export default function configureRoutes(app) {
  app.use(bodyParser.json());
  app.use("/api/register", registerUser);
  app.use("/api/login", loginUser);
  app.use("/api/user", user);
  app.use("/api/transaction", transaction);
  app.use("/api/saving", saving);
  app.use("/api/currency", currency);
  app.use("/api/update", update);
}
