import app from "./app.js";
import dotenv from "dotenv";
import syncDB from "./syncDB.js";
import updatePrice from "./jobs/change.price.js";

dotenv.config();

const Puerto = process.env.PORT;

const main = () => {
  app.listen(Puerto);
  console.log(`Servidor escuchando en el puerto ${Puerto}`);
};
updatePrice()
syncDB()
main();