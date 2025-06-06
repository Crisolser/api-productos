import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import Routes from "./all.routes.js";
import syntaxError from "./helpers/error.sintaxys.js";
import { methods as Response } from "./helpers/response.handler.js";

const app = express();

app.use(cors());

//Middlewares
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));
app.use(syntaxError);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(Routes);

app.use("/", (req, res) => {
    let message = "Recurso no encontrado"
    Response.errorHandler(req,res,{statusCode: 404,message})
    return
});


export default app;