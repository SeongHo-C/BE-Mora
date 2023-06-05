const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }

  static associate(db) {
    db.Comment.belongsTo(db.Board, {
      foreignKey: 'board_id',
      targetKey: 'id',
      onDelete: 'cascade',
    });
    db.Comment.belongsTo(db.User, {
      foreignKey: 'commenter',
      targetKey: 'id',
      onDelete: 'cascade',
    });
  }
}

module.exports = Comment;
