module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    nameBook: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pageNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING
    }
  })
  Book.associate = models => {
    Book.hasMany(models.Loan,
      {onDelete: "cascade"})
  }
  return Book;
}