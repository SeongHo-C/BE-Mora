const Sequelize = require('sequelize');

/**
 * 일정 테이블
 */
class Plan extends Sequelize.Model {
  static initiate(sequelize) {
    Plan.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Plan',
        tableName: 'plans',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Plan.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id' });
    db.Plan.hasMany(db.PlanLink, { foreignKey: 'plan_id', sourceKey: 'id' });
  }
}

/**
 * 일정 링크 테이블
 */
class PlanLink extends Sequelize.Model {
  static initiate(sequelize) {
    PlanLink.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'PlanLink',
        tableName: 'planLinks',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.PlanLink.belongsTo(db.Plan, {
      foreignKey: 'plan_id',
      targetKey: 'id',
    });
  }
}

module.exports = { Plan, PlanLink };
