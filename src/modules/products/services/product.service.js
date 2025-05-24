import { methods as Validator } from "../validators/package.validator.js"
import { methods as ProductRepository } from "../../../repository/product.repository.js"
import error from "../../../helpers/error.constructor.js"

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
    const totalPages = Math.ceil(productsCount/limit)

    const response = {
        total_pages:totalPages,
        current_page:page,
        count:productsCount,
        filters,
        products:productsList
    }

    return response

}

export const methods = {
    createProduct,
    getProducts
}