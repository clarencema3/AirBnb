'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: 'This place was great',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'It was okay',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'I liked this place',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: "Not bad",
        stars: 3
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
