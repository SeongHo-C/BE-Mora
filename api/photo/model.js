const Sequelize = require('sequelize');

class Photo extends Sequelize.Model {
  static initiate(sequelize) {
    Photo.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        path: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        origin_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Photo',
        tableName: 'photos',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Photo.belongsTo(db.User, { foreignKey: 'board_id', targetKey: 'id' });
  }
}

module.exports = Photo;
