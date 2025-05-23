import sequelize from "./database/sequelize.db.js";
import CompanyModel from "./models/companies.model.js";
import OrderItemsModel from "./models/order_items.model.js";
import OrderModel from "./models/order.model.js";
import ProductUnitModel from "./models/product_unit.model.js";
import ProductModel from "./models/product.model.js";

export default async function syncDB() {
    try{
        await sequelize.authenticate()
        console.log('✅ - Conexión establecida.');

        const Company = CompanyModel(sequelize)
        const ProductUnit = ProductUnitModel(sequelize)
        const OrderItem = OrderItemsModel(sequelize)
        const Order = OrderModel(sequelize)
        const Product = ProductModel(sequelize)

        await sequelize.sync({ alter: true })
        console.log('✅ - Base de datos sincronizada.');

        const countCompany = await Company.count();
        if(countCompany === 0){
            await Company.bulkCreate([
                {
                   "name":"Bama Company",
                   "contact_person":"Cristian Olmedo Serrano",
                   "contact_phone":"5555555555",
                   "rfc":"OESC9611052P3" 
                },
                {
                   "name":"Test Company",
                   "contact_person":"Juanito Pérez",
                   "contact_phone":"5555555555",
                   "rfc":"OESC9611052P3" 
                }
            ])
            console.log('✅ - Compañías de prueba insertadas');
        }
        else{
            console.log('⚠️ - Ya existen compañías en la base de datos. No se insertaron nuevos.');
        }

        const productUnitCount = await ProductUnit.count()
        if(productUnitCount === 0){
            await ProductUnit.bulkCreate([
                {name:"pieza"},
                {name:"paquete"},
                {name:"kg"},
                {name:"litro"}
            ])
            console.log('✅ - Unidades de producto insertadas');
        }
        else{
            console.log('⚠️ - Unidades de producto ya detectadas');
        }
    }
    catch(Err){
        console.error('❌ Error al conectar o sincronizar:', Err);
    }
    
}