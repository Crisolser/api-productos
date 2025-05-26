import {methods as ProductRepository} from "../repository/product.repository.js"

const updatePrice = async () => {
  console.log("⏰ Actualización de precios cada 24 horas");

  // Ejecuta cada 24 horas (24 * 60 * 60 * 1000 milisegundos)
  setInterval(async () => {
    console.log("Actualizando precios...")
    try {
      const filters = {name:"Sabritas",limit:100,page:1}
      const products = await ProductRepository.getProducts(filters)
      const productIds = products.map(product => product.product_id)
      for (const productId of productIds) {
        const product = await ProductRepository.getProduct(productId)
        const actualPrice = product.price
        const newPrice = product.price * 1.1
        await ProductRepository.updateProduct(productId, {price: newPrice})
        console.log(`Producto ${productId} actualizado de ${actualPrice} a ${newPrice}`)
      }
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }
  },  24 * 60 * 60 * 1000);
}

export default updatePrice