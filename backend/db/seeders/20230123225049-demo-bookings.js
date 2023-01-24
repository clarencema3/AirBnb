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
       startDate: '2023-02-01',
       endDate: '2023-02-20',
       userId: 1,
       spotId: 2
     },
     {
      startDate: '2023-05-08',
      endDate: '2023-05-20',
      userId: 1,
      spotId: 3
     },
     {
      startDate: '2023-06-09',
      endDate: '2023-07-01',
      userId: 3,
      spotId: 1
     },
     {
      startDate: '2024-01-01',
      endDate: '2024-01-30',
      userId: 2,
      spotId: 2
     }
   ], {});
   
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-02-01', '2023-05-08', '2023-06-09', '2024-01-01'] }
    }, {});
  }
};
