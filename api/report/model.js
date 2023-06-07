const Sequelize = require('sequelize');

class Report extends Sequelize.Model {
  static initiate(sequelize) {
    Report.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('board', 'comment'),
          allowNull: false,
        },
        from_user_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
        },
        to_user_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
        },
        target_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('ready', 'hold', 'delete'),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Report',
        tableName: 'reports',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {}
}

module.exports = Report;
