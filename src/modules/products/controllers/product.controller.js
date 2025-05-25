import { methods as Response } from "../../../helpers/response.handler.js"
import { methods as ProductService } from "../services/product.service.js"

const getProducts = async (req,res) => {
    try{
        const products = await ProductService.getProducts(req.query)
        const additionalData = products
        const message = "Lista de paquetes obtenidos"
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
    }
}

const getProduct = async (req,res) => {
    try{
        const product = await ProductService.getProduct(req.params.id)
        const message = "Paquete obtenido"
        const additionalData = product
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
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

const updateProduct = async (req,res) => {
    try{
        const updatedProduct = await ProductService.updateProduct(req.params.id,req.body)
        const message = "Paquete actualizado"
        const additionalData = updatedProduct
        Response.successHandler(req,res,{message,additionalData})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
    }
}

const deleteProduct = async (req,res) => {
    try{
        const deletedProduct = await ProductService.deleteProduct(req.params.id)
        const message = "Paquete eliminado"
        Response.successHandler(req,res,{message})
    }
    catch(Err){
        const {message,statusCode,additionalData} = Err
        Response.errorHandler(req,res,{message,additionalData,statusCode})
    }
}

export const methods = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}