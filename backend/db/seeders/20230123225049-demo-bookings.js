'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Bookings';
   return queryInterface.bulkInsert(options, [
     {
       startDate: new Date('2023-02-01'),
       endDate: new Date('2023-02-20'),
       userId: 1,
       spotId: 2
     },
     {
      startDate: new Date('2023-05-08'),
      endDate: new Date('2023-05-20'),
      userId: 1,
      spotId: 3
     },
     {
      startDate: new Date('2023-06-09'),
      endDate: new Date('2023-07-01'),
      userId: 3,
      spotId: 1
     },
     {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-30'),
      userId: 2,
      spotId: 2
     },
     {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-04-30'),
      userId: 2,
      spotId: 2
     },
     {
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-04-30'),
      userId: 4,
      spotId: 4
     },
   ], {});
   
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: [new Date('2023-02-01'), new Date('2023-05-08'), new Date('2023-06-09'), new Date('2024-01-01')] }
    }, {});
  }
};
