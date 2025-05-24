import error from "../../../helpers/error.constructor.js"
import invalidParameters from "../../../helpers/validate.invalid.parameters.js"
import missingParameters from "../../../helpers/validate.missing.parrameters.js"

const ProductBodyParameters = (product) => {
    let validParameters = ["name","description","company_id","price","cost","unit_id","barcode"]
    let mandatoryParameters = ["name","company_id","price","barcode"]
    let invalid = invalidParameters(product,validParameters)
    let missing = missingParameters(product,mandatoryParameters)

    if(invalid.length>0) throw error("Parámetros inválidos",{invalid_parameters:invalid})
    if(missing.length>0) throw error("Parámetros obligatorios faltantes",{missing_parameters:missing})
}

const ProductBody = (product) => {
    const {
        name,
        description,
        company_id,
        price,
        cost,
        unit_id,
        barcode
    } = product

    if(typeof name !== "string") throw error("El parámetro 'name' debe ser un string")
    if(typeof company_id !== "number") throw error("El parámetro 'company_id' debe ser un número")
    if(typeof price !== "number") throw error("El parámetro 'company_id' debe ser un número")
    if(typeof barcode !== "string") throw error("El parámetro 'barcode' debe ser un string")
    if(description && typeof description !== "string") throw error("El parámetro 'description' debe ser un string")
    if(cost && typeof cost !== "number") throw error("El parámetro 'cost' debe ser un número")
    if(unit_id && typeof unit_id !== "number") throw error("El parámetro 'unit_id' debe ser un número") 

}

const ProductFiltersParameters = (filters) => {
    let validParameters = ["limit","page","name","barcode","company_id","unit_id"]
    let invalid = invalidParameters(filters,validParameters)

    if(invalid.length>0) throw error("Parámetros inválidos",{invalid_parameters:invalid})
}

const ProductFilters = (filters) => {
    let maxLimit = 100

    let {limit,company_id,unit_id} = filters

    if(limit>maxLimit) throw error(`No se pueden listar más de ${maxLimit} productos`)
    if(company_id && isNaN(company_id)) throw error("El parámetro 'company_id' debe ser un número")
    if(unit_id && isNaN(unit_id)) throw error("El parámetro 'unit_id' debe ser un número")
}


export const methods = {
    ProductBodyParameters,
    ProductBody,
    ProductFiltersParameters,
    ProductFilters
}