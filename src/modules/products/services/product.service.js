import { methods as Validator } from "../validators/package.validator.js"
import { methods as ProductRepository } from "../../../repository/product.repository.js"
import error from "../../../helpers/error.constructor.js"
import comparateChanges from "../../../helpers/comparate.objects.js"

const createProduct = async (product) => {
    Validator.ProductBodyParameters(product)
    Validator.ProductBody(product)

    const findBarcode = await ProductRepository.findProductByBarecode(product.barcode)
    if(findBarcode) throw error(`El código de barras '${product.barcode}' ya está asociado a un producto`)

    const newProduct = await ProductRepository.createProduct(product)
    const response = {
        product:newProduct
    }

    return response
}

const getProducts = async (filters) => {
    let {limit,page} = filters
    if(!limit) filters.limit=10
    if(!page) filters.page=1

    Validator.ProductFiltersParameters(filters)
    Validator.ProductFilters(filters)

    const productsList = await ProductRepository.getProducts(filters)
    const productsCount = await ProductRepository.getProductsCount(filters)
    const totalPages = Math.ceil(productsCount/filters.limit)

    const response = {
        total_pages:totalPages,
        current_page:Number(filters.page),
        count:productsCount,
        filters,
        products:productsList
    }

    return response
}

const getProduct = async (productId) => {
    const idRegex = /^\d+$/
    const isValidId = idRegex.test(productId)
    if(!isValidId) throw error("ID de paquete no válido") 

    const product = await ProductRepository.getProduct(productId)

    if(product == null) throw error(`Paquete con id ${productId} no encontrado`)
    const response = {
        product
    }

    return response
}

const updateProduct = async (productId,changes) => {
    const idRegex = /^\d+$/
    const isValidId = idRegex.test(productId)
    if(!isValidId) throw error("ID de paquete no válido")

    Validator.ProductBody(changes)

    const product = await ProductRepository.getProduct(productId)
    if(product == null) throw error(`Paquete con id ${productId} no encontrado`)

    const {realChanges,oldData} = comparateChanges(changes,product)
    const updatedFiles = Object.keys(realChanges)

    await ProductRepository.updateProduct(productId,realChanges)

    const response = {
        product_id:productId,
        updated_files:updatedFiles,
        old_values:oldData,
        new_values:realChanges  
    }

    return response
}

const deleteProduct = async (productId) => {
    const idRegex = /^\d+$/
    const isValidId = idRegex.test(productId)
    if(!isValidId) throw error("ID de paquete no válido") 

    const product = await ProductRepository.getProduct(productId)

    if(product == null) throw error(`Paquete con id ${productId} no encontrado`)
    const response = {
        product
    }

    const deletedProduct = await ProductRepository.deleteProduct(productId)

    return
}

export const methods = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}