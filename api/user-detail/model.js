const Sequelize = require('sequelize');

/**
 * 회원 상세정보 테이블
 */
class UserDetail extends Sequelize.Model {
  static initiate(sequelize) {
    UserDetail.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        comment: {
          type: Sequelize.STRING(150),
        },
        img_path: {
          type: Sequelize.STRING,
        },
        generation: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        profile_public: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: 'UserDetail',
        tableName: 'user_details',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.UserDetail.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = UserDetail;
