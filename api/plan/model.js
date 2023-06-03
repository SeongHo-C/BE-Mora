const Sequelize = require('sequelize');

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
        underscored: false,
        modelName: 'Plan',
        tableName: 'plans',
        peranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Plan.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id' });
  }
}

module.exports = Plan;
