const User = require('../../db/models/UsersModel');

const delete_users = async (req, res, next) => {
  const condition = req.body;

  if (!condition) {
    return res
      .status(404)
      .send('Please provide a key/value pair to filter your query.');
  }
  const { deletedCount } = await User.deleteMany(condition);
  return res
    .status(200)
    .send(
      `You have successfully deleted ${deletedCount} users from your database.`
    );
};

module.exports = { delete_users };
