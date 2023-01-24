'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://unsplash.com/photos/bSpVH5V0YX8",
        preview: true
      },
      {
        spotId: 2,
        url: "https://unsplash.com/photos/nWMcDsDAxu0",
        preview: false
      },
      {
        spotId: 3,
        url: "google.com",
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://unsplash.com/photos/bSpVH5V0YX8", "https://unsplash.com/photos/nWMcDsDAxu0", "google.com"]}
    }, {});
  }
};
