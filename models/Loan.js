module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define("Loan", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING
    }
  })
  Loan.associate = models => {
    Loan.belongsTo(models.Book, 
      { foreignKey: {
        allowNull: false
      }}),
    Loan.belongsTo(models.User,
      { foreignKey: {
        allowNull: false
      }})
  }
  return Loan;
}