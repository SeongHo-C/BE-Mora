const Sequelize = require('sequelize');

/**
 * 경력 테이블
 */
class Career extends Sequelize.Model {
  static initiate(sequelize) {
    Career.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        company_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        hire_date: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
        resign_date: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(500),
        },
      },
      {
        sequelize,
        modelName: 'Career',
        tableName: 'careers',
        timestamps: true,
        paranoid: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Career.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}

module.exports = Career;
