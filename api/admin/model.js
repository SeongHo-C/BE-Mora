const Sequelize = require('sequelize');

class Admin extends Sequelize.Model {
  static initiate(sequelize) {
    Admin.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Admin',
        tableName: 'admins',
        peranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Admin.hasMany(db.Plan, { foreignKey: 'admin_id', sourceKey: 'id' });
    db.Admin.hasMany(db.Notice, { foreignKey: 'admin_id', sourceKey: 'id' });
  }
}

module.exports = Admin;
