'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Insert initial data into table "my_friends"
    await queryInterface.bulkInsert(
      'my_friends',
      [
        { name: 'Juan', gender: 'M' },
        { name: 'María', gender: 'F' },
        { name: 'Ana', gender: 'F' },
        { name: 'Sebastián', gender: 'M' },
        { name: 'Marcos', gender: 'M' },
        { name: 'Carmen', gender: 'F' },
      ],
      {},
    );
  },

  async down(queryInterface) {
    // Delete inserted data in the up method
    await queryInterface.bulkDelete('my_friends', null, {});
  },
};
