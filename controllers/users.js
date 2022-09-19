import User from '../models/User.js';

import bcrypt from 'bcrypt';

import createImageCustomObject from '../utils/createImageObject.js';

// eslint-disable-next-line consistent-return
const get_all_users = async (req, res) => {
  const users = await User.find();

  return users.length
    ? res.status(200).json(users)
    : res.status(404).send('No users found');
};

//sends information about the current user, coming from the authorizeUser middleware
const get_self = (req, res) => res.status(200).send(req.currentUser);

const delete_users = async (req, res, next) => {
  try {
    const { deletedCount } = await User.deleteMany();
    return res
      .status(200)
      .send(
        `You have successfully deleted ${deletedCount} users from your database.`
      );
  } catch (err) {
    next(err);
  }
};

//creates a new user
const create_new_user = async (req, res, next) => {
  try {
    //grab url from uploaded file on S3
    const { location } = req.file;

    // const { username, email, password, role } = JSON.parse(data);
    const { username, email, password, role } = req.body;
    //block request is fields are missing
    if (!username || !email || !password || !location)
      return res.status(400).json({
        message:
          'Bad request, please provide username, email, image and password',
      });

    if (role && role === 'admin')
      return res
        .status(403)
        .send('You are not allowed to create an admin user');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role && role,
      profile_pic: location,
    });

    await newUser.save();

    const { _id } = newUser;

    const token = newUser.createToken();

    return res
      .status(201)
      .set('x-authorization-token', token)
      .json({
        message: 'Successfully created a new user',
        userRegistrationData: [{ _id, email, username, profile_pic: location }],
      });
  } catch (e) {
    next(e);
  }
};

const update_self = async (req, res, next) => {
  const { _id } = req.currentUser;

  try {
    //hash the password if the user is updating the password
    if (req.body.password)
      req.body.password = await bcrypt.hash(req.body.password, 10);

    const userToUpdate = await User.findById(_id);

    for (const key in req.files) {
      if (key === 'profile_pic' || key === 'cover_pic') {
        const customImageObject = createImageCustomObject(req.files[key]);
        const index = userToUpdate.photos.findIndex(
          (photo) => photo.fieldname === key
        );
        if (index >= 0) {
          userToUpdate.photos[index] = customImageObject;
        }
      }
    }
    for (const key in req.body) {
      userToUpdate[key] = req.body[key];
    }

    const updatedUser = await userToUpdate.save();

    return updatedUser
      ? res
          .status(200)
          .json({ message: 'User successfully updated', updatedUser })
      : res
          .status(404)
          .send('The user you are trying to update does not exist');
  } catch (err) {
    next(err);
  }
};

const delete_self = async (req, res, next) => {
  try {
    const { _id } = req.currentUser;

    const isDeleted = await User.findByIdAndDelete(_id);
    return isDeleted
      ? res.status(200).send('Successfully deleted user from the database')
      : res
          .status(404)
          .send('The user you are trying to delete does not exist');
  } catch (err) {
    next(err);
  }
};
export {
  delete_users,
  delete_self,
  get_all_users,
  get_self,
  update_self,
  create_new_user,
};
