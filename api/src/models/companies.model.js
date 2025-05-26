import { DataTypes } from "sequelize";

const CompanyModel = (sequelize) => {
  console.log("✅ - Generando tabla 'companies'")
  const Company = sequelize.define("Company", {
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    contact_phone: {
      type: DataTypes.STRING(12),
      allowNull: true,
    },
    rfc: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  }, {
    tableName: "companies",
    timestamps: false,
  });

  return Company;
};

export default CompanyModel