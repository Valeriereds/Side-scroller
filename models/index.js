const User = require('./user');
const Scores = require('./scores');

User.hasMany(score, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Scores.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Scores };
