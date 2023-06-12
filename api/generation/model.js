const Sequelize = require('sequelize');

class Generation extends Sequelize.Model {
  static initiate(sequelize) {
    Generation.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        phase: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Generation',
        tableName: 'generations',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Generation.hasOne(db.UserDetail, {
      foreignKey: 'generation_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = Generation;
