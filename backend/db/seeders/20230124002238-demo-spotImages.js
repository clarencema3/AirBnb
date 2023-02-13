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
        url: "https://i.imgur.com/S53zsPu.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/emVc2cT.png",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/3AiCJQ5.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/T6Wx5F0.jpg",
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ["https://i.imgur.com/S53zsPu.jpg", "https://i.imgur.com/emVc2cT.png", "https://i.imgur.com/3AiCJQ5.png", "https://i.imgur.com/T6Wx5F0.jpg"]}
    }, {});
  }
};
