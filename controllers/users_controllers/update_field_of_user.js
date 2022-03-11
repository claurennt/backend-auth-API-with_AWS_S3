const User = require('../../db/models/UsersModel');

const update_field_of_user = async (req, res, next) => {
  // retrieve the id
  const { _id } = req.user;

  // retrieve the field to update
  const condition = req.body;

  if (!condition)
    return res
      .status(400)
      .send('Please provide a key/value pair of the field you want to update');

  if (condition.role && condition.role === 'admin') {
    return res.status(401).send("You can't update the role of an admin");
  }
  try {
    await User.findByIdAndUpdate(_id, condition, {
      new: true,
    });

    res.status(200).send('User successfully updated');
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = { update_field_of_user };
