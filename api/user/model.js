const Sequelize = require('sequelize');

/**
 * 회원 테이블
 */
class User extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
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
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasOne(db.Profile, {
      foreignKey: 'user_id',
      targetKey: 'email',
    });
    db.User.hasMany(db.Board, { foreignKey: 'writer', sourceKey: 'id' });
  }
}

module.exports = User;
