const Sequelize = require('sequelize');

/**
 * 교육 테이블
 */
class Education extends Sequelize.Model {
  static initiate(sequelize) {
    Education.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        program: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        start_date: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        end_date: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Education',
        tableName: 'educations',
        timestamps: true,
        underscored: true,
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Education.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = Education;
