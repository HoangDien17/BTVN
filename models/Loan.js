module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define("Loan", {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
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