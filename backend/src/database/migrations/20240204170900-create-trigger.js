'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear la tabla my_friends si aún no existe
    await queryInterface.createTable('my_friends', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // Crear el trigger en PostgreSQL
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION notify_backend()
      RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('backend_notification', JSON_BUILD_OBJECT(
          'table', TG_TABLE_NAME,
          'action', TG_OP,
          'new_data', row_to_json(NEW),
          'old_data', row_to_json(OLD)
        )::TEXT);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    
      CREATE TRIGGER my_friends_notify_trigger
      AFTER INSERT OR UPDATE OR DELETE
      ON my_friends
      FOR EACH ROW
      EXECUTE FUNCTION notify_backend();
    `);
  },

  async down(queryInterface) {
    // Eliminar el trigger en PostgreSQL
    await queryInterface.sequelize.query(`
    DROP TRIGGER IF EXISTS my_friends_notify_trigger ON "my_friends";
    DROP FUNCTION IF EXISTS notify_backend();
    `);

    // Eliminar la tabla MyFriends si existe
    await queryInterface.dropTable('MyFriends');
  },
};
