import request from "supertest"
import app from "../app.js"

describe("GET /product/:id",() => {

    it("Petición exitosa",async () => {
        const res = await request(app).get("/product/5")
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toMatchObject({
            message: expect.any(String),
            product: {
                product_id: expect.any(Number),
                name: expect.any(String),
                company_id: expect.any(Number),
                price: expect.any(String),
                unit_id: expect.any(Number),
                barcode: expect.any(String)
            },
        })
    })

    it("Error por id incorrecto o inválido",async () => {
        const res = await request(app).get("/product/abcd")
        expect(res.statusCode).toBe(400)
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.message).toBe("ID de paquete no válido")
    })
})