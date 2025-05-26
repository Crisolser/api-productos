import { DataTypes } from "sequelize";

const ProductUnitModel = (sequelize) => {
  console.log("✅ - Generando tabla 'product_unit'")
  const ProductUnit = sequelize.define("ProductUnit", {
    product_unit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  }, {
    tableName: "product_unit",
    timestamps: false,
  });

  return ProductUnit;
};

export default ProductUnitModel