import { where, Op } from "sequelize";
import sequelize from "../database/sequelize.db.js"
import ProductModel from "../models/product.model.js";

const Product = ProductModel(sequelize)

const createProduct = async (productData) => {
    const newProduct = await Product.create(productData)
    return newProduct.get()
}

const findProductByBarecode = async (barcode) => {
    const product = await Product.findOne({
        where:{barcode}
    }) 
    return product
}

const getProducts = async (filters) => {
    let {limit,page,name,barcode,company_id,unit_id} = filters
    let where = {}

    if(name) where.name = {[Op.iLike]:`%${name}%`}
    if(barcode) where.barcode = barcode
    if(company_id) where.company_id = company_id
    if(unit_id) where.unit_id = unit_id

    const offset = (page-1)*limit
    const products = await Product.findAll({
        where:where,
        limit:limit,
        offset:offset
    })

    let productList = products.map((row)=>row.get())

    return productList
}

const getProductsCount = async (filters) => {
    let {name,barcode,company_id,unit_id} = filters
    let where = {}

    if(name) where.name = {[Op.iLike]:`%${name}%`}
    if(barcode) where.barcode = barcode
    if(company_id) where.company_id = company_id
    if(unit_id) where.unit_id = unit_id
    
    const productsCount = await Product.count({
        where:where
    })

    return productsCount
}

export const methods = {
    createProduct,
    findProductByBarecode,
    getProducts,
    getProductsCount
}