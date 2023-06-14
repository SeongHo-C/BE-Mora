const Sequelize = require('sequelize');

/**
 * 링크 테이블
 */
class Link extends Sequelize.Model {
  static initiate(sequelize) {
    Link.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        url: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Link',
        tableName: 'links',
        timestamps: true,
        paranoid: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Link.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = Link;
