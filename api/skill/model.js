const Sequelize = require('sequelize');

class Skill extends Sequelize.Model {
  static initiate(sequelize) {
    Skill.init(
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
        underscored: true,
        modelName: 'Skill',
        tableName: 'skills',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Skill.belongsToMany(db.User, {
      through: 'user_skills',
      onDelete: 'cascade',
    });
  }
}

module.exports = Skill;
