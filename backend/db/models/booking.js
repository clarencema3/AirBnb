'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        checkDate(value) {
          const endDateStr = value.toDateString();
          const startDateStr = this.startDate.toDateString();
          const startDateTime = startDateStr.getTime();
          const endDateTime = endDateStr.getTime();
          if (startDateTime > endDateTime) {
            throw new Error('Start date must be before the ending date')
          }

        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};