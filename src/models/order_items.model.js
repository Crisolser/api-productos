import { DataTypes } from "sequelize";

const OrderItemsModel = (sequelize) => {
  console.log("✅ - Generando tabla 'order_items'")
  const OrderItem = sequelize.define("OrderItem", {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "order_items",
    timestamps: false,
  });

  return OrderItem;
};

export default OrderItemsModel