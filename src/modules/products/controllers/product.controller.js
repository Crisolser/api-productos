import error from "../../../helpers/error.constructor.js"
import { methods as Response } from "../../../helpers/response.handler.js"
import { methods as ProductService } from "../services/product.service.js"

const getProducts = async (req,res) => {
    try{
        const products = await ProductService.getProducts(req.query)
        const message = "Lista de paquetes obtenidos"
        const additionalData = products
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
    }
}

const getProduct = async (req,res) => {
    try{
        const message = "Paquete obtenido"
        Response.successHandler(req,res,{message})
    }
    catch(Err){
        const message = Err.message
        Response.successHandler(req,res,{message})
    }
}

const createProduct = async (req,res) => {
    try{
        const newProduct = await ProductService.createProduct(req.body)
        const message = "Paquete creado"
        const additionalData = newProduct
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
    }
}

export const methods = {
    getProducts,
    getProduct,
    createProduct
}