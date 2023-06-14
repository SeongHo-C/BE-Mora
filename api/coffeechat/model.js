const Sequelize = require('sequelize');

class Coffeechat extends Sequelize.Model {
  static initiate(sequelize) {
    Coffeechat.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Coffeechat',
        tableName: 'coffeechats',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Coffeechat.belongsTo(db.User, {
      foreignKey: 'profile_id',
      targetKey: 'id',
      as: 'ProfileId',
      onDelete: 'cascade',
    });
    db.Coffeechat.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'UserId',
      onDelete: 'cascade',
    });
  }
}

module.exports = Coffeechat;
