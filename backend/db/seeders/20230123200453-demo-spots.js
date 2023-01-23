'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 123,
      },
      {
        ownerId: 1,
        address: '123 something',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States of America',
        lat: 40.7645358,
        lng: 122.4730327,
        name: 'Encore',
        description: 'something something shots',
        price: 123,
      },
      {
        ownerId: 2,
        address: '123 ok',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States of America',
        lat: 50.7645358,
        lng: -140.4730327,
        name: 'Disneyland',
        description: 'Mickey Mouse',
        price: 100,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Disney Lane', '123 something', '123 ok'] }
    }, {})
  }
};
