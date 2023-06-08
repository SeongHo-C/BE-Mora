const Sequelize = require('sequelize');

class Blacklist extends Sequelize.Model {
  static initiate(sequelize) {
    Blacklist.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        checked: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        login_time: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Blacklist',
        tableName: 'blacklists',
        peranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Blacklist.belongsTo(db.User, {
      foreignKey: 'email',
      sourceKey: 'email',
    });
  }
}

module.exports = Blacklist;
