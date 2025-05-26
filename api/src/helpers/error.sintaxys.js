import { methods as Response } from "./response.handler.js";

const syntaxError = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    let message = "JSON malformado. Por favor, verifica la estructura de tus datos."
    Response.errorHandler(req,res,{statusCode: 400,message});
    return;
  }
  next();
}

export default syntaxError