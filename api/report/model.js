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
          type: Sequelize.ENUM('BOARD', 'COMMENT'),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('READY', 'HOLD', 'DELETE'),
          defaultValue: 'READY',
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

  static associate(db) {
    db.Report.belongsTo(db.User, {
      foreignKey: 'from_user_id',
      targetKey: 'id',
      as: 'FromUser',
      onDelete: 'cascade',
    });
    db.Report.belongsTo(db.User, {
      foreignKey: 'to_user_id',
      targetKey: 'id',
      as: 'ToUser',
      onDelete: 'cascade',
    });
  }
}

module.exports = Report;
