'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "image.url"
      },
      {
        reviewId: 2,
        url: "image.url"
      },
      {
        reviewId: 3,
        url: "image.url"
      },
      {
        reviewId: 4,
        url: "image.url"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://unsplash.com/photos/NR2eMg9zXxA", "https://unsplash.com/photos/_v1BQFRWko8"]}
    }, {});
  }
};
