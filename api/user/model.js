const Sequelize = require('sequelize');

/**
 * 회원 테이블
 */
class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
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
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        paranoid: false,
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Board, {
      foreignKey: 'writer',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.User.hasMany(db.Career, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.User.hasMany(db.Comment, {
      foreignKey: 'commenter',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.User.hasMany(db.Like, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.User.hasMany(db.Report, {
      foreignKey: 'from_user_id',
      sourceKey: 'id',
      as: 'FromUser',
      onDelete: 'cascade',
    });
    db.User.hasMany(db.Report, {
      foreignKey: 'to_user_id',
      sourceKey: 'id',
      as: 'ToUser',
      onDelete: 'cascade',
    });
    db.User.belongsToMany(db.Skill, {
      through: 'user_skills',
      onDelete: 'cascade',
    });
    db.User.hasOne(db.UserDetail, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = User;
