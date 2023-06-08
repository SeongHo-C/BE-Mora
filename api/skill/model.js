const Sequelize = require('sequelize');

/**
 * 스킬 테이블
 */
class Skill extends Sequelize.Model {
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
          type: Sequelize.STRING(20),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Skill',
        tableName: 'skills',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
}

/**
 * 유저 스킬 테이블
 */
class UserSkill extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        skill_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'UserSkill',
        tableName: 'user_skills',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.UserSkill.belongsTo(db.Skill, {
      foreignKey: 'skill_id',
      targetKey: 'id',
    });
    db.UserSkill.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}

module.exports = { Skill, UserSkill };
