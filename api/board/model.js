const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
  static initiate(sequelize) {
    Board.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        category: {
          type: Sequelize.ENUM('free', 'knowledge', 'study', 'question'),
          allowNull: false,
          defaultValue: 'free',
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        view_cnt: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Board',
        tableName: 'boards',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Board.hasMany(db.Comment, {
      foreignKey: 'board_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.Board.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id' });
    db.Board.belongsToMany(db.Hashtag, {
      through: 'board_hashtag',
    });
    db.Board.hasMany(db.Photo, {
      foreignKey: 'board_id',
      sourceKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Board.hasMany(db.User, {
      foreignKey: 'board_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.Board.hasMany(db.Like, {
      foreignKey: 'board_id',
      sourceKey: 'id',
      onDelete: 'cascade',
    });
    db.Board.hasMany(db.Report, {
      foreignKey: 'target_id',
      sourceKey: 'id',
    });
  }
}

module.exports = Board;
