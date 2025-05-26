import { DataTypes } from "sequelize";

const OrderModel = (sequelize) => {
  console.log("✅ - Generando tabla 'orders'")
  const Order = sequelize.define("Order", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: "orders",
    timestamps: false,
  });

  return Order;
};

export default OrderModel