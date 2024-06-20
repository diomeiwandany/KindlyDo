'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/tasks.json').map((e) => {
      delete e.id;
      e.createdAt = e.updatedAt = new Date();
      return e;
    });
    // console.log(data);
    await queryInterface.bulkInsert('Tasks', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
  }
};
