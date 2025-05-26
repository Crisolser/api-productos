import request from "supertest"
import app from "../app.js"

describe("GET /product",() => {

    const expectError = (res, message) => {
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchObject({ message: expect.any(String) })
        expect(res.body.message).toBe(message)
    }

    it("Petición exitosa",async () => {
        const res = await request(app).get("/product")
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchObject({
            message: expect.any(String),
            total_pages: expect.any(Number),
            current_page: expect.any(Number),
            count: expect.any(Number),
            filters: {
                limit: expect.any(Number),
                page: expect.any(Number)
            },
            products: expect.any(Array)
        })
        expect(res.body.products[0]).toMatchObject({
            product_id: expect.any(Number),
            name: expect.any(String),
            company_id: expect.any(Number),
            price: expect.any(String),   
            unit_id: expect.any(Number),
            barcode: expect.any(String),
            status: expect.any(Number)
        })
        
    })
    
    it("Limite de resultados excedido", async () => {
        const res = await request(app).get("/product?limit=120")
        expectError(res, "No se pueden listar más de 100 productos")
    })

    it("Parámetro 'limit' con formato erróneo", async () => {
        const res = await request(app).get("/product?limit=abc")
        expectError(res, "El parámetro 'limit' no tiene el formato adecuado")
    })

    it("Parámetro 'page' con formato erróneo", async () => {
        const res = await request(app).get("/product?page=abc")
        expectError(res, "El parámetro 'page' no tiene el formato adecuado")
    })

    it("Parámetro 'company_id' con formato erróneo", async () => {
        const res = await request(app).get("/product?company_id=abc")
        expectError(res, "El parámetro 'company_id' no tiene el formato adecuado")
    })

    it("Parámetro 'unit_id' con formato erróneo", async () => {
        const res = await request(app).get("/product?unit_id=abc")
        expectError(res, "El parámetro 'unit_id' no tiene el formato adecuado")
    })
})