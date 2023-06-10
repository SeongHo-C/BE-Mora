const { Sequelize, DataTypes } = require('sequelize');

/**
 * 퀴즈 모델
 */
class Quiz extends Sequelize.Model {
  static initiate(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        question: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        answer: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        hint: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Quiz',
        tableName: 'quizs',
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
}

module.exports = Quiz;
