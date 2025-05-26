import request from "supertest"
import app from "../app.js"
import randomId from "../helpers/generate.random.id.js"

describe("POST /product",() => {
    let barcode = randomId()
    let baseInput = {
        "name":"Producto de test",
        "description":"Descripción de Test",
        "company_id":1,
        "price":20.55,
        "cost":20.35,
        "unit_id":1,
        barcode
    }

    it("Petición exitosa",async () => {
        const res = await request(app).post("/product").send(baseInput)
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Object)
    })
    it("Peticiión con 'barecode' existente",async () => {
        const res = await request(app).post("/product").send(baseInput)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El código de barras '${barcode}' ya está asociado a un producto`)
    })
    it("Peticiión con parámetros inválidos",async () => {
        let invalidInput = {
            baseInput,
            ...{
                test1:"extra",
                test2:"param"
            }
        }
        const res = await request(app).post("/product").send(invalidInput)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`Parámetros inválidos`)
    })
    it("Peticiión con parámetros mandatorios faltantes",async () => {
        let {name,company_id,...partialInput} = baseInput
        const res = await request(app).post("/product").send(partialInput)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`Parámetros obligatorios faltantes`)
    })
    it("Peticiión con parámetro 'name' nulo",async () => {
        let inputWithEmpyName = {...baseInput,name:""}
        const res = await request(app).post("/product").send(inputWithEmpyName)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'name' no puede ser nulo`)
    })
    it("Peticiión con parámetro 'name' diferente a string",async () => {
        let inputWithNumberName  = {...baseInput,name:123}
        const res = await request(app).post("/product").send(inputWithNumberName)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'name' debe ser un string`)
    })
    it("Peticiión con parámetro 'company_id' nulo",async () => {
        let inputWithEmpyCompany  = {...baseInput,company_id:""}
        const res = await request(app).post("/product").send(inputWithEmpyCompany)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'company_id' no puede ser nulo`)
    })
    it("Peticiión con parámetro 'company_id' diferente a numero",async () => {
        let inputWithStringCompany  = {...baseInput,company_id:"123"}
        const res = await request(app).post("/product").send(inputWithStringCompany)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'company_id' debe ser un número`)
    })
    it("Peticiión con parámetro 'price' nulo",async () => {
        let inputWithEmpyPrice  = {...baseInput,price:""}
        const res = await request(app).post("/product").send(inputWithEmpyPrice)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'price' no puede ser nulo`)
    })
    it("Peticiión con parámetro 'price' diferente a numero",async () => {
        let inputWithStringPrice  = {...baseInput,price:"123"}
        const res = await request(app).post("/product").send(inputWithStringPrice)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'price' debe ser un número`)
    })
    it("Peticiión con parámetro 'barcode' nulo",async () => {
        let inputWithEmpyBarcode  = {...baseInput,barcode:""}
        const res = await request(app).post("/product").send(inputWithEmpyBarcode)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'barcode' no puede ser nulo`)
    })
    it("Peticiión con parámetro 'barcode' diferente a string",async () => {
        let inputWithNumberBarcode  = {...baseInput,barcode:123}
        const res = await request(app).post("/product").send(inputWithNumberBarcode)
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe(`El parámetro 'barcode' debe ser un string`)
    })
})