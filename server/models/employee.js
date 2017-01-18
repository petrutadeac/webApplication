'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define('Employee', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {

          //An author can have many books.
          Employee.hasMany(models.Bill,{
            onDelete:'cascade'
          })

        }
    }
  });
  return Employee;
};