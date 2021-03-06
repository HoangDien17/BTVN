module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = models => {
    User.hasOne(models.Loan, {
      onDelete: "cascade"
    })
  }
  return User;
}