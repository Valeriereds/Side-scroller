// requiring the user and scores models
const User = require('./User');
const Score = require('./Score');

//set the foreign key relationship from the user model to the scores model
User.hasMany(Score, {
  foreignKey: 'user_id',
  // when a user is deleted, the associated scores will also be deleted
  onDelete: 'CASCADE'
});

// set the inverse side of the foreign key relationship between the scores and user models
Score.belongsTo(User, {
  foreignKey: 'user_id'
});

//export both models
module.exports = { User, Score };
