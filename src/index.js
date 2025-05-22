import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const Puerto = process.env.PORT;

const main = () => {
  app.listen(Puerto);
  console.log(`Servidor escuchando en el puerto ${Puerto}`);
};
main();