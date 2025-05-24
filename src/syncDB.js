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

        await sequelize.sync({ force: true })
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

        await Product.bulkCreate([
            {name:"Cocacola sin azucar",company_id:1,price:20.50,barcode:"12345"},
            {name:"Cocacola normal",company_id:1,price:20.50,barcode:"12346"},
            {name:"Cocacola de dieta",company_id:1,price:20.50,barcode:"12347"},
            {name:"Fresca 600 ml",company_id:1,price:20.50,barcode:"12348"},
            {name:"Sabritas naturales",company_id:1,price:20.50,barcode:"12349"},
            {name:"Sabritas adobadas",company_id:1,price:20.50,barcode:"12350"},
            {name:"Sabritas limon",company_id:1,price:20.50,barcode:"12351"},
            {name:"Sabritas salsa habanero",company_id:1,price:20.50,barcode:"12352"},
            {name:"Gomitas",company_id:1,price:20.50,barcode:"12353"},
            {name:"Chucherias",company_id:1,price:20.50,barcode:"12354"},
            {name:"Sabritas verdes",company_id:1,price:20.50,barcode:"12355"},
            {name:"Sabritas rojas",company_id:1,price:20.50,barcode:"12356"},
            {name:"Sabritas amarillas",company_id:1,price:20.50,barcode:"12357"},
            {name:"Sabritas sin sabor",company_id:1,price:20.50,barcode:"12358"},
            {name:"Arcoiris",company_id:2,price:20.50,barcode:"12359"},
            {name:"Lords",company_id:2,price:20.50,barcode:"12360"},
            {name:"Vuala",company_id:2,price:20.50,barcode:"12361"},
            {name:"Choquis",company_id:2,price:20.50,barcode:"12362"},
            {name:"Emperador",company_id:2,price:20.50,barcode:"12363"},
            {name:"Marias",company_id:2,price:20.50,barcode:"12364"},
            {name:"Florentinas",company_id:2,price:20.50,barcode:"12365"},
            {name:"Mamut",company_id:2,price:20.50,barcode:"12366"},
            {name:"Saladitas",company_id:2,price:20.50,barcode:"12367"},
            {name:"Chips",company_id:3,price:20.50,barcode:"12368"},
            {name:"BigMix",company_id:3,price:20.50,barcode:"12369"}
        ])
    }
    catch(Err){
        console.error('❌ Error al conectar o sincronizar:', Err);
    }
    
}