# CASO DE OPTIMIZACIÓN / DEPURACIÓN

## - CASO: Optimización de inserción de items en paquetes

### 📚 CONTEXTO: 

Dentro de los diferentes enpoints de una empresa de servicios logísticos, se cuenta con una API publica que permite a los clientes crear los paquetes que se deben recolectar y entregar, en esta creación se llena en el body la información básica del paquete, dirección, persona de contacto, número celular, coordenadas etc. y en especial un parámetro `items` el cual es un array de productos o mercancías.

**EJEMPLO DE BODY DE CREACIÓN DE PAQUETES**

``` json
{
    "region_id": 1,
    "service_id": 1,
    "client_warehouse_id": 19,
    "address": "Atenas, sn, sn, BALCONES DE VALLE DORADO, Estado de Mexico, TLALNEPANTLA DE BAZ, 54020, 1234567898",
    "zip_code": "54020",
    "latitude": 19.5475623,
    "longitude": -99.2120819,
    "contact_person": "Pruebas",
    "contact_phone": "1234567898",
    "references": "casa azul",
    "additional_instructions": ".",
    "internal_id": "5015100101",
    "items": [
        {
            "sku": "140539",
            "description": "Bulto de croquetas 5kg",
            "count": 1,
            "amount": 44900
        },
        {
            "sku": "140539",
            "description": "Comida para tortugas",
            "count": 1,
            "amount": 44900
        }
    ]
}
```

### 📋 DETECCIÓN Y PLANTEAMIENTO DEL PROBLEMA

Tanto el backend como los servidores están monitoreados con la herramienta *New Relic* donde detecté que había cierto número de peticiones que tenían un tiempo de respuesta de 4 a 5 segundos, cuando el promedio en tiempo de respuesta de los endpoints es dé 250 a 400 ms.

### 📊 ANÁLISIS Y DIATNÓSTICO
Recopilé los logs de **NGINX** para identificar las peticiones que estaban teniendo este comportamiento, de inmediato todo apuntaba en que la latencia se estaba presentando exclusivamente en el endpoint para la creación de los paquetes (`POST /api/package`) y en peticiones exitosas (`estatusCode: 200`).

Debido a que por estrategia de optimización en monitoreo y telemetría solo se imprimía el body de las peticiones de error (`estatusCode: 4xx || 5xx`), me di a la tarea de rastrear los ids de los paquetes creadaos coinsidiendo con la fecha de creación y la fecha de registro del log con latencia. 

Logré recolectar suficientes ids para analizar los cuerpos de las peticiones para replicar la creación y entender si esto se debía a algo meramente del servidor o alguna mala configuración en la lógica de inserción del paquete. 

Se descubrió que todos los paquetes que presentaban latencia tenían arriba de 10 items asociados, de inmediato la hipótesis se hizo clara:

**"Un mal manejo en la lógica de inserción de items en la base de datos"**

### 💡 SOLUCIÓN IMPLEMENTADA

Revisando el servicio de creación de paquetes se confirmó que en lugar de realizar una sola inserción para todos los items asociados al paquete, se estaba realizando un ciclo `for` con inserción recursiva de cada item, esto debido a que en que la función del `repository` encargada de la inserción de paquetes solo estaba diseñada para insertar un paquete a la vez, entonces el desarrollador que trabajó el endpoint para la creación de paquetes decidió en su momento utilizar la función ya establecida y aplicarle un ciclo `for` en la capa del `service` para evitar crear una nueva función o adaptar la actual para soportar carga masiva con un solo insert.

- Código sin optimizar: 

```js
// src/repository/item
const createItem = (packageId,itemData) => {
    const newItem = {
        package_id:packageId,
        ...itemData
    }

    await Item.create(newPakage)

    return
}

// src/module/package/service
const createPackage = (data) => {
    const {items,...orderData} = data
    const newPakage = await PackageRepository.createPackage(items)
    const packageId = newPackage.package_id

    if(items.length>0){
        for(var i=0; i<items.length; i++){
            const item = items[i]
            newItem = await ItemRepository.createItem(packageId,item)
        }
    }

    return newPakage
}
```
- Después de optimizar:

``` js
const createItems = (listItems) => {
    await Item.bulkCreate(listItems)

    return
}

// src/module/package/service
const createPackage = (data) => {
    const {items,...orderData} = data
    const newPakage = await PackageRepository.createPackage(items)
    const packageId = newPackage.package_id

    if(items.length>0){
        const listItems = items.map((item) => item.package_id=packageId)
        await ItemRepository.createItems(listItems)
    }

    return newPakage
}
```

### 📈 METRICAS

Posterior a la optimización pasamos de tener un 20% de latencia en el servicio para crear paquetes a un 0% 

El tiempo promedio de respuesta de las peticiones pasó de 3 segundos a 350 ms

### ✅ RECOMENDACIONES

Tener extrema precaución en servicios que estén asociados con alguna entidad padre y con el uso de ciclos para interactuar con la capa de repository ya que eso puede ser señal de una mala optimización en consultas o inserciones. 
