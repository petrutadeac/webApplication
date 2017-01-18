'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bill = sequelize.define('Bill', {
    amount: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bill;
};