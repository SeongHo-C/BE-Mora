const Sequelize = require('sequelize');

class Alert extends Sequelize.Model {
  static initiate(sequelize) {
    Alert.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('COMMENT', 'PLAN', 'COFFEECHAT'),
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        checked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Alert',
        tableName: 'alerts',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Alert.belongsTo(db.User, {
      foreignKey: 'from_user_id',
      targetKey: 'id',
      as: 'AlertFromUser',
      onDelete: 'cascade',
    });
    db.Alert.belongsTo(db.User, {
      foreignKey: 'to_user_id',
      targetKey: 'id',
      as: 'AlertToUser',
      onDelete: 'cascade',
    });
  }
}

module.exports = Alert;
